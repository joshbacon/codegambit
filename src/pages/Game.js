import '../styles/Game.css';
import '../styles/Board.css';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link, /*useLocation*/ } from 'react-router-dom';
import { Terminal } from '../components/Terminal';

import Board from '../components/Board';

import docs from '../assets/icons/docs.svg';
import back from '../assets/icons/back.svg';


const Game = (props) => {

  // const location = useLocation();
  // const {game} = location.state;

  const [tmnl, _updateTmnl] = useState(Terminal());

  const [currCommand, setCurrCommand] = useState("");

  const updateCommand = (e) => {
    setCurrCommand(e.target.value);
  }

  const checkKey = (e) => {
    if (currCommand === '') { return }
    let key = e.key;
    if (key === 'Enter') {
      tmnl.parseCommand(currCommand);
      setCurrCommand("");
    } else if (key === 'ArrowUp') {
      setCurrCommand(tmnl.getPreviousCommand());
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
          <img src={back} alt='Back button'/>
        </Link>
        <Link to='/documentation' state={{backPath:'/play'}} className='docs-btn header-btn'>
          <img src={docs} alt='Documentation button'/>
        </Link>
      </div>
      <section className="main">
        {/* <div className={"board " + (localStorage.getItem('bTheme') ?? 'bBlue')}>
          {Object.entries(tmnl.getPieces()).map(([key, value]) => {
            return <div
              key={key}
              className={"square "+key+" "+value+(key === tmnl.getSelected() ? " selected" : "")}
            />
          })}
        </div> */}

        <Board data={{select: tmnl.getSelected(), playingAs: tmnl.getPlayingAs()??'w'}}/>

        <div className="terminal">
          <table className="command-history">
            <tbody>
              {tmnl.getCommandHistory().map((value, key) => {
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
              spellCheck="false"
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