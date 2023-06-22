import '../styles/Game.css';
import '../styles/Board.css';
import React from 'react';
import { Link, /*useLocation*/ } from 'react-router-dom';
import { Terminal } from '../components/Terminal';
import { useSelector } from 'react-redux';

import Board from '../components/Board';

import docs from '../assets/icons/docs.svg';
import back from '../assets/icons/back.svg';


const Game = () => {
  
  const {game} = useSelector(state => state);
  
  // const jsChessEngine = require('js-chess-engine');
  // const engine = new jsChessEngine.Game('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
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
        <Board game={game.game} selected={game.selected} playingAs={game.playingAs}/>
        <Terminal state={game} engine={null}/>
      </section>
    </div>
  );
}

export default Game;