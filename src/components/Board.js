import '../styles/Board.css';
import React from 'react';
import { useSelector } from 'react-redux';

import {store} from '../store/store';

const Board = (props) => {
  
    const {position, selected, playingAs} = useSelector(state => state);
    // console.log(position, selected, playingAs);
    console.log(store.getState());

    const initialPieces = {A1: "R", A2: "P", A7: "p", A8: "r", B1: "N", B2: "P", B7: "p", B8: "n", C1: "B", C2: "P", C7: "p", C8: "b", D1: "Q", D2: "P", D7: "p", D8: "q", E1: "K", E2: "P", E7: "p", E8: "k", F1: "B", F2: "P", F7: "p", F8: "b", G1: "N", G2: "P", G7: "p", G8: "n", H1: "R", H2: "P", H7: "p", H8: "r"};

    // return <div></div>
    return <div className={"board " + (playingAs??'w'+localStorage.getItem('bTheme') ?? playingAs??'w'+'bBlue')}>
        {Object.entries(position??initialPieces).map(([key, value]) => {
            return <div
                key={key}
                className={"square "+key+" "+value+(key === selected??'' ? " selected" : "")}
            />
        })}
    </div>

}

export default Board;