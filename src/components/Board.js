import '../styles/Board.css';
import React from 'react';
import { useSelector } from 'react-redux';

import {store} from '../store/store';

const Board = (props) => {
  
    const {position, selected, playingAs} = useSelector(state => state.game);
    // console.log(position, selected, playingAs);
    // console.log(store.getState());

    // return <div></div>
    return <div className={"board " + playingAs + (localStorage.getItem('bTheme') ?? 'bBlue')}>
        {Object.entries(position.pieces).map(([key, value]) => {
            return <div
                key={key}
                className={"square "+key+" "+value+(key === selected??'' ? " selected" : "")}
            />
        })}
    </div>

}

export default Board;