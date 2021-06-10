import { RouteComponentProps } from 'react-router';
import * as SquareGameStore from '../store/Square';
import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import styles from './SquareGame.module.css';

type SquareGameProps = 
SquareGameStore.SquareGameState &
typeof SquareGameStore.actionCreators & RouteComponentProps<{}>;

interface GameState {
    user:string
}

class SquareGame extends PureComponent<SquareGameProps, GameState> {

    constructor(props:SquareGameProps) {
        super(props);
        
        this.state = {
            user: ''
        };

        this.onInputchange = this.onInputchange.bind(this);
    }

    componentDidMount(){
        this.props.getSquare();
    }

    onInputchange(event:any) {
        this.setState({
         user: event.target.value
        });
      }

    render() {
        return (
            <>
            <div className={"container " + styles.table}>
                <div className="row">
                    <div className="col">
                        <input type="text" value={this.state.user} onChange={this.onInputchange}/>
                    </div>
                </div>
                {
                    this.props.matrix && this.props.matrix.map((row, x) => {
                        return <div className="row" key={x}>
                            { row.map((col, y) => {
                                    return <div className={"col cursor-pointer " +styles.col} key={`${x}-${y}`} onClick={() => this.props.assignSquare(x, y, this.state.user)}>{col.owner}</div>
                                })
                                }
                        </div>
                        
                    })
                }
            </div>
            </>
        )
    }
}

export default connect((state: ApplicationState) => state.square, SquareGameStore.actionCreators)(SquareGame as any);
