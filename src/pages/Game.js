import '../styles/Game.css';
import '../styles/Board.css';
import React from 'react';
import { Link, /*useLocation*/ } from 'react-router-dom';
import { Terminal } from '../components/Terminal';
import { useSelector } from 'react-redux';

import Board from '../components/Board';

import docs from '../assets/icons/docs.svg';
import back from '../assets/icons/back.svg';


const Game = (props) => {

  const {game} = useSelector(state => state);
  // console.log('reload')

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
        <Board position={game.position} selected={game.selected} playingAs={game.playingAs}/>
        <Terminal state={game}/>
      </section>
    </div>
  );
}

export default Game;