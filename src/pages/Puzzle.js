import '../styles/Puzzle.css';
import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Board from '../components/Board.js';
import PuzzleCard from '../components/PuzzleCard.js';
import Editor from '../components/Editor.js';
import puzzles from '../data/puzzles.json';

import close from '../assets/icons/close.svg';

const Puzzles = (props) => {

    const location = useLocation();
    const {puzzleId} = location.state;
    console.log(puzzleId);

    // functions go up here
    const [running, updateRunning] = useState(false);

    return <div className='puzzlePage'>
        <Link to={'/puzzles'} className='puzzle-close-btn'>
            <img src={close} alt={'back'}/>
        </Link>
        <div className='puzzle'>
            { running ? 
                <Board /> : <>
                <div className='puzzleVideo' />
                <PuzzleCard data={puzzles[puzzleId-1]}/>
            </> }
        </div>
        <Editor setRunning={updateRunning}/>
    </div>
}

export default Puzzles;