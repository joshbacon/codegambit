import '../styles/Board.css';
import React from 'react';
import { useSelector } from 'react-redux';

const Board = (props) => {
    
    const jsChessEngine = require('js-chess-engine');
    const { status } = jsChessEngine;

    const {game, selected, playingAs} = useSelector(state => state.game);

    return <div className={"board " + playingAs + (localStorage.getItem('bTheme') ?? 'bBlue')}>
        {Object.entries(status(game).pieces).map(([key, value]) => {
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

export default Board;