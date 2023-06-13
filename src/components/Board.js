import '../styles/Board.css';
import React from 'react';
import {useSelector} from 'react-redux';

const Board = (props) => {

    let {selected, playingAs} = props.data;    
    const position = useSelector(state => state.position);

    return <div className={"board " + (playingAs+localStorage.getItem('bTheme') ?? playingAs+'bBlue')}>
        {Object.entries(position.pieces).map(([key, value]) => {
            return <div
                key={key}
                className={"square "+key+" "+value+(key === selected ? " selected" : "")}
            />
        })}
    </div>

}

export default Board;