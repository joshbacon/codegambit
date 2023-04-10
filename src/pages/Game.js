import '../styles/Game.css';
import '../styles/Board.css';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {Link, useLocation} from 'react-router-dom';
import Docs from '../pages/Docs.js';
import { Terminal } from '../components/Terminal';

// import { Chess } from '../chess/chess';
// import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine';



const Game = (props) => {

  const location = useLocation();
  const {FEN} = location.state;

  // let game = Chess(FEN);
  // const game = new Game();
  // const jsChessEngine = require('js-chess-engine');
  // const game = new jsChessEngine.Game();

  let tmnl = Terminal();


  const [currCommand, setCurrCommand] = useState("");
  const [commandHistory, updateCommandHistory] = useState([
    'Welcome to code_gambit! We teach coding through playing chess.',
    'type help(method) to see how to use a given method or check out the documentation at the top left for a list of commands.',
  ]);

  const updateCommand = (e) => {
    setCurrCommand(e.target.value);
  }

  const checkKey = (e) => {
    if (currCommand === '') { return }
    var key = e.key;
    // console.log(e.key);
    let rc = "'"+currCommand+"' is not recognized.";
    if (key === 'Enter'){

      //clean input
      const input = currCommand.split('(');
      const method = input[0];
      let params;
      if (input[1]) {
        params = input[1].split(')');
        params = params[0].split(',');
      }
      setCurrCommand("");
    }
  }

  const ScrollToBottom = () => {
    const scrollRef = useRef();
    useEffect(() => scrollRef.current.scrollIntoView());
    return <tr ref={scrollRef} />;
  }

  return (
    <div className="game">
      <div className="gameHeader">
        <h1>{'>'}code_gambit</h1>
        <Link to='/' className='back-btn header-btn'>
          <div className='backImg header-btn'/>
        </Link>
        <Link to='/documentation' state={{backPath:'/play', FEN:game.exportFEN()}} className='docs-btn header-btn'>
          <div className='docsImg header-btn'/>
        </Link>
      </div>
      <section className="main">
        <div className={"board bBlue"}>
          {Object.entries(game.getPieces()).map(([key, value]) => {
            return <div key={key} className={"square "+key+" "+value}></div>
          })}
        </div>

        <div className="terminal">
          <table className="command-history">
            <tbody>
              {commandHistory.map((value, key) => {
                return <tr key={key}>
                  <td>{value}</td>
                </tr>
              })}
              <ScrollToBottom />
            </tbody>
          </table>
          <div className="terminal-in">{'>'}
            <input
              type="text"
              // autoCorrect="off"
              // autoSuggest="off"
              // autoComplete="off"
              // autoCapitalize="off"
              value={currCommand}
              onChange={updateCommand}
              onKeyUp={checkKey}
              className="code-in">
            </input>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Game;