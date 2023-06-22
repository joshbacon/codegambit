import '../styles/Board.css';
import React from 'react';
import { connect, useSelector } from 'react-redux';

// import {store} from '../store/store';

const Board = (props) => {
    // console.log(props)
  
    const {game, selected, playingAs} = props;
    const initPos = {A1: "R", A2: "P", A7: "p", A8: "r", B1: "N", B2: "P", B7: "p", B8: "n", C1: "B", C2: "P", C7: "p", C8: "b", D1: "Q", D2: "P", D7: "p", D8: "q", E1: "K", E2: "P", E7: "p", E8: "k", F1: "B", F2: "P", F7: "p", F8: "b", G1: "N", G2: "P", G7: "p", G8: "n", H1: "R", H2: "P", H7: "p", H8: "r"};
    // const {game, selected, playingAs} = useSelector(state => state.game);
    // const game = useSelector(state => state.game);
    // console.log(game, selected, playingAs);
    // console.log(store.getState());

    // return <div></div>
    return <div className={"board " + playingAs + (localStorage.getItem('bTheme') ?? 'bBlue')}>
        {Object.entries(Object.keys(game).length !== 0 ? game.pieces : initPos).map(([key, value]) => {
            return <div
                key={key}
                className={
                    "square "+(playingAs === 'w' ? key.toUpperCase() : key.toLowerCase())+" "+
                        value+(key === selected ? " selected" : "")
                }
            />
        })}
    </div>

}


// export default connect((state)=>{return {game: state.game}})(Board);
export default Board;