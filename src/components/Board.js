import '../styles/Board.css';
import React from 'react';
import { useSelector } from 'react-redux';

const Board = (props) => {
    
    const jsChessEngine = require('js-chess-engine');
    const { status } = jsChessEngine;

    const {game, selected, playingAs, history, validMoves} = useSelector(state => state.game);

    let mateSquare = '';
    if (status(game).checkMate) {
        if (status(game).turn === "white") {
            mateSquare = 'K';
        } else {
            mateSquare = 'k';
        }
    }

    return <div className={"board " + playingAs + (localStorage.getItem('bTheme') ?? 'bBlue')}>
        {Object.entries(status(game).pieces).map(([key, value]) => {
            return <div
                key={key}
                className={
                    "square " + (playingAs === 'w' ? key.toUpperCase() : key.toLowerCase()) + " " +
                        value + (key === selected ? " selected" : "") +
                        (history.length > 0 && key === history[history.length -1][1] ? " lastMove" : "") +
                        (mateSquare === value ? " mated" : "")
                }
            />
        })}
        {validMoves.length > 0 ? validMoves.map((value) => {
            return <div
                key={value}
                className={"square " + value + " valid"}
            />
        }) : <></>}
    </div>
}

export default Board;