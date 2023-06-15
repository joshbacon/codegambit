import '../styles/Board.css';
import React from 'react';
import {useSelector} from 'react-redux';

const Board = (props) => {
  
    const pieces = useSelector(state => state.position.pieces ?? {A1: "R", A2: "P", A7: "p", A8: "r", B1: "N", B2: "P", B7: "p", B8: "n", C1: "B", C2: "P", C7: "p", C8: "b", D1: "Q", D2: "P", D7: "p", D8: "q", E1: "K", E2: "P", E7: "p", E8: "k", F1: "B", F2: "P", F7: "p", F8: "b", G1: "N", G2: "P", G7: "p", G8: "n", H1: "R", H2: "P", H7: "p", H8: "r"});
    const selected = useSelector(state => state.selected ?? '');
    const playingAs = useSelector(state => state.playingAs ?? 'b');

    console.log(pieces);
    console.log(selected);
    console.log(playingAs);


    return <div className={"board " + (playingAs+localStorage.getItem('bTheme') ?? playingAs+'bBlue')}>
        {Object.entries(pieces).map(([key, value]) => {
            return <div
                key={key}
                className={"square "+key+" "+value+(key === selected ? " selected" : "")}
            />
        })}
    </div>

}

export default Board;