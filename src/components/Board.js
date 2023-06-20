import '../styles/Board.css';
import React from 'react';
import { connect, useSelector } from 'react-redux';

// import {store} from '../store/store';

const Board = (props) => {
    // console.log(props)
  
    const {position, selected, playingAs} = props;
    // const {position, selected, playingAs} = useSelector(state => state.game);
    // const game = useSelector(state => state.game);
    // console.log(game);
    // console.log(store.getState());

    // return <div></div>
    return <div className={"board " + playingAs + (localStorage.getItem('bTheme') ?? 'bBlue')}>
        {Object.entries(position.pieces).map(([key, value]) => {
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