import React, { FC, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector, useStore } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store'
import * as SquareGameStore from '../store/Square';
import styles from './SquareGame.module.css';

type SquareGameProps = 
SquareGameStore.SquareGameState &
typeof SquareGameStore.actionCreators & RouteComponentProps<{}>;

export const SquareGameFunc:FC<SquareGameProps> = (props:SquareGameProps) => {
    const dispatch = useDispatch();
    const store = useStore();
  
     const [user, setUser] = useState('');

     const matrix = useSelector((state:ApplicationState) => state.square.matrix);
     
     const onAssignSquare = (x:number, y:number, owner:string) => {
         dispatch(props.assignSquare(x, y, owner));
     };

     useEffect(() => {
         dispatch(props.getSquare())
     }, [dispatch])

    return (
        <div className={"container " + styles.table}>
                <div className="row">
                    <div className="col">
                        <input type="text" value={user} onChange={() => setUser(user)}/>
                    </div>
                </div>
                {
                    matrix && matrix.map((row, x) => {
                        return <div className="row" key={x}>
                            { row.map((col, y) => {
                                    return <div className={"col cursor-pointer " +styles.col} key={`${x}-${y}`} onClick={() => onAssignSquare(x, y, user)}>{col.owner}</div>
                                })
                                }
                        </div>
                        
                    })
                }
            </div>
    )
}

export default connect((state: ApplicationState) => state.square, SquareGameStore.actionCreators)(SquareGameFunc as any);