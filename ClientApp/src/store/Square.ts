import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface Square {
    x: number;
    y: number;
    owner: string;
}

export interface SquareGameState {
    matrix: Square[][];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface AssignSquareAction { type: 'ASSIGN_SQUARE', matrix: Square[][] }
export interface SignalRAssignSquareAction { type: 'SIGNALR_ASSIGN_SQUARE', x: number, y: number, owner: string }

export interface GetSquareAction { type: 'GET_SQUARE', matrix: Square[][] }
export interface SignalRGetSquareAction { type: 'SIGNALR_GET_SQUARE' }


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = AssignSquareAction | SignalRAssignSquareAction | GetSquareAction | SignalRGetSquareAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    assignSquare: (x: number, y: number, owner: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SIGNALR_ASSIGN_SQUARE', owner, x, y })
    },
    getSquare: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SIGNALR_GET_SQUARE' })
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<SquareGameState> = (state: SquareGameState | undefined, incomingAction: Action): SquareGameState => {
    if (state === undefined) {
        return {
            matrix: []
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ASSIGN_SQUARE':
            return { matrix: action.matrix };
        case 'GET_SQUARE':
            debugger
            return { matrix: action.matrix };
        default:
            return state;
    }
};
