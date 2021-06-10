import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44391/squaregame").build();

export function signalRInvokeMiddleware(store: any) {

    return (next: any) => async (action: any) => {
        switch (action.type) {
            case "SIGNALR_ASSIGN_SQUARE":
                connection.invoke('AssignSquare', action.owner, action.x, action.y);
                break;
            case "SIGNALR_GET_SQUARE":
                connection.invoke('GetSquare');
                break;
        }

        return next(action);
    }
}



export function signalRRegisterCommands(store: any, callback: Function) {

    connection.on('AssignSquare', (data) => {
        store.dispatch({ type: 'ASSIGN_SQUARE', matrix: data });
    })

    connection.on('GetSquare', (data) => {
        debugger
        store.dispatch({ type: 'GET_SQUARE', matrix: data });
    })

    connection.start().then(callback());

}