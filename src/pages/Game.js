import '../styles/Game.css';
import '../styles/Board.css';
import React from 'react';
import { Link } from 'react-router-dom';

import Board from '../components/Board';
import Terminal from '../components/Terminal';

import docs from '../assets/icons/docs.svg';
import back from '../assets/icons/back.svg';


const Game = () => {
  
  return (
    <div className="game">
      <div className="gameHeader">
        <h1>{'>'}code_gambit</h1>
        <Link to='/' className='back-btn header-btn'>
          <img src={back} alt='Back button'/>
        </Link>
        <Link to='/documentation' state={{backPath:'/play'}} className='docs-btn header-btn'>
          <img src={docs} alt='Documentation button'/>
        </Link>
      </div>
      <section className="main">
        <Board />
        <Terminal />
      </section>
    </div>
  );
}

export default Game;