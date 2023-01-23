import './Board.css';
import React from 'react';

const Board = (props) => {
    const data = props.data;

    return <div className={"board "+data.boardTheme}>
        {/* {data.pieces.map((value, key) => {
            return <div key={key} className={"square "+value.piece+" "+value.pos}></div>
        })} */}
    </div>

}

export default Board;



// get the theme and piece data through props