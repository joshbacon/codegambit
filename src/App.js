import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Docs } from './documentation/Docs.js';

function App() {

  const [secrets, setsecrets] = useState(false);

  const [showDocs, setShowDocs] = useState(false);
  const [settings, setSettings] = useState(false);
  const [boardTheme, setBoardTheme] = useState('bBlue');

  const [selectedPiece, setSelectedPiece] = useState({});
  const [piecesBlack, updatePiecesBlack] = useState([]);
  const [piecesWhite, updatePiecesWhite] = useState([]);

  const [currCommand, setCurrCommand] = useState("");
  const [commandHistory, updateCommandHistory] = useState([
    'Welcome to code_gambit! We teach coding through playing chess.',
    'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
  ]);

  // Places pieces in their starting positions
  const initGame = () => {
    updatePiecesBlack([
      {'id': 0 , 'piece':'bp', 'pos':'A7', 'selected': false},
      {'id': 1 , 'piece':'bp', 'pos':'B7', 'selected': false},
      {'id': 2 , 'piece':'bp', 'pos':'C7', 'selected': false},
      {'id': 3 , 'piece':'bp', 'pos':'D7', 'selected': false},
      {'id': 4 , 'piece':'bp', 'pos':'E7', 'selected': false},
      {'id': 5 , 'piece':'bp', 'pos':'F7', 'selected': false},
      {'id': 6 , 'piece':'bp', 'pos':'G7', 'selected': false},
      {'id': 7 , 'piece':'bp', 'pos':'H7', 'selected': false},
      {'id': 8 , 'piece':'br', 'pos':'A8', 'selected': false},
      {'id': 9 , 'piece':'bn', 'pos':'B8', 'selected': false},
      {'id': 10, 'piece':'bb', 'pos':'C8', 'selected': false},
      {'id': 11, 'piece':'bq', 'pos':'D8', 'selected': false},
      {'id': 12, 'piece':'bk', 'pos':'E8', 'selected': false},
      {'id': 13, 'piece':'bb', 'pos':'F8', 'selected': false},
      {'id': 14, 'piece':'bn', 'pos':'G8', 'selected': false},
      {'id': 15, 'piece':'br', 'pos':'H8', 'selected': false}
    ]);
    updatePiecesWhite([
      {'id': 0 , 'piece':'wp', 'pos':'A2', 'selected': false},
      {'id': 1 , 'piece':'wp', 'pos':'B2', 'selected': false},
      {'id': 2 , 'piece':'wp', 'pos':'C2', 'selected': false},
      {'id': 3 , 'piece':'wp', 'pos':'D2', 'selected': false},
      {'id': 4 , 'piece':'wp', 'pos':'E2', 'selected': false},
      {'id': 5 , 'piece':'wp', 'pos':'F2', 'selected': false},
      {'id': 6 , 'piece':'wp', 'pos':'G2', 'selected': false},
      {'id': 7 , 'piece':'wp', 'pos':'H2', 'selected': false},
      {'id': 8 , 'piece':'wr', 'pos':'A1', 'selected': false},
      {'id': 9 , 'piece':'wn', 'pos':'B1', 'selected': false},
      {'id': 10, 'piece':'wb', 'pos':'C1', 'selected': false},
      {'id': 11, 'piece':'wq', 'pos':'D1', 'selected': false},
      {'id': 12, 'piece':'wk', 'pos':'E1', 'selected': false},
      {'id': 13, 'piece':'wb', 'pos':'F1', 'selected': false},
      {'id': 14, 'piece':'wn', 'pos':'G1', 'selected': false},
      {'id': 15, 'piece':'wr', 'pos':'H1', 'selected': false}
    ]);
  }

  const updateSettings = () => {
    setSettings(!settings);
  }

  const openDocs = () => {
    // open the docs component
    setShowDocs(!showDocs);
  }

  const changeTheme = (newTheme) => {
    setBoardTheme(newTheme);
  }

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

  useEffect(() => {
    initGame();
  }, [])

  return (
    <div className="App">

      <header className="App-header">
        <h1>{'>'}code_gambit</h1>
        { showDocs ? <></> :
          <button className="settings-btn header-btn" onClick={updateSettings}></button>}
        { showDocs ?
          <button className="close-btn header-btn" onClick={openDocs}></button> :
          <button className="docs-btn header-btn" onClick={openDocs}></button>
        }
      </header>
      { showDocs ?
        <Docs secret={secrets} /> : <>
        <section className="main">
          { settings &&
            <div className="settings-section">
              <div className="settings-panel">
                <h1>settings</h1>
                <div className="picker">
                  <h2>board theme</h2>
                  <div className="theme-options">
                    <div onClick={() => changeTheme("bDark")}   className="theme dark"></div>
                    <div onClick={() => changeTheme("bLight")}  className="theme light"></div>
                    <div onClick={() => changeTheme("bPurple")} className="theme purple"></div>
                    <div onClick={() => changeTheme("bBlue")}   className="theme blue"></div>
                    <div onClick={() => changeTheme("bGreen")}  className="theme green"></div>
                    <div onClick={() => changeTheme("bOrange")} className="theme orange"></div>
                  </div>
                </div>
                <div className="picker">
                  <h2>bot depth</h2>
                  <div className="difficulty-options">
                    <div className="difficulty">1</div>
                    <div className="difficulty">2</div>
                    <div className="difficulty">3</div>
                    <div className="difficulty">4</div>
                    <div className="difficulty">5</div>
                    <div className="difficulty">6</div>
                  </div>
                </div>
                <div className='picker no-light-mode'>
                  <h2>window theme</h2>
                  <button><h3>switch to light mode</h3></button>
                </div>
                <div className='picker'>
                  <h2>play as...</h2>
                  <div className='start-color-options'>
                    <button className='start-color white'>white</button>
                    <button className='start-color black'>black</button>
                    <button className='start-color random'>random</button>
                  </div>
                </div>
              </div>
              <div className='background-blur' onClick={updateSettings}></div>
            </div>
          }

          <div className={"board "+boardTheme}>
            {piecesBlack.map((value, key) => {
              return <div key={key} className={"square "+value.piece+" "+value.pos+(value.selected?'selected':'')}></div>
            })}
            {piecesWhite.map((value, key) => {
              return <div key={key} className={"square "+value.piece+" "+value.pos+(value.selected?'selected':'')}></div>
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
      </>}
    </div>
  );
}

export default App;
