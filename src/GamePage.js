import './GamePage.css';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {Link, useLocation} from 'react-router-dom';
import Docs from './documentation/Docs.js';
import { Chess } from './chess/chess';
import { Terminal } from './Terminal';

const Game = (props) => {

  const location = useLocation();
  const {FEN} = location.state;

  let game = Chess(FEN);
  let tmnl = Terminal();


  const [currCommand, setCurrCommand] = useState("");
  const [commandHistory, updateCommandHistory] = useState([
    'Welcome to code_gambit! We teach coding through playing chess.',
    'type help(method) to see how to use a given method or check out the documentation for a list of commands.',
    'Currently working on: making the main page dynamic, want a breakpoint to put the terminal under the board at some point.',
    'make the look thing in the docs a hamburger menu at a breakpoint (might have to fudge the cards too)',
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

  // useEffect(() => {
  //   game = Chess('');
  // }, [])

  return (
    <div className="game">
      <header className="gameHeader">
        <h1>{'>'}code_gambit</h1>
        <Link to='/' className='back-btn header-btn'>
          <div className='backImg header-btn'/>
        </Link>
        <Link to='/documentation'  state={{backPath:'/play', FEN:game.generateFEN()}} className='docs-btn header-btn'>
          <div className='docsImg header-btn'/>
        </Link>
      </header>
      <section className="main">
        <div className={"board bBlue"}>
          {game.getPieces().map((value, key) => {
            return <div key={key} className={"square "+value.piece+" "+value.pos}></div>
          })}
            {/* {piecesBlack.map((value, key) => {
              return <div key={key} className={"square "+value.piece+" "+value.pos+(value.selected?'selected':'')}></div>
            })}
            {piecesWhite.map((value, key) => {
              return <div key={key} className={"square "+value.piece+" "+value.pos+(value.selected?'selected':'')}></div>
            })} */}
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