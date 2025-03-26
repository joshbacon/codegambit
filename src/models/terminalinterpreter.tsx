import { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import DocData from '../data/docs.json';
import DocLookup from '../data/docLookup.json';
import { move, status, moves, aiMove, getFen } from 'js-chess-engine';

const TerminalInterpreter = (editorEnabled: boolean) => {
  
    //const { inGame, playingAs, selected, aiLevel, game, history, commands } = useSelector(state => state.game);
  
    //const dispatch = useDispatch();
  
    const WHITE = 'w';
    const BLACK = 'b';
  
    let singlePlayer = true;
    
}

export default TerminalInterpreter;