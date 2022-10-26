import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Docs } from './Docs.js';

function App() {

  const [docs, setDocs] = useState(false);
  const [settings, setSettings] = useState(false);
  const [theme, setTheme] = useState('dark');

  const [selectedPiece, setSelectedPiece] = useState({});
  const [piecesBlack, updatePiecesBlack] = useState([]);
  const [piecesWhite, updatePiecesWhite] = useState([]);

  const [currCommand, setCurrCommand] = useState("");
  const [commandHistory, updatecommandHistory] = useState([
    'Welcome to code_gambit! We teach coding through playing chess.',
    'type help() for a list of commands.'
  ]);

  // Places pieces in their starting positions
  const initGame = () => {

    let black = [
      {'id': 0 , 'piece':'bp', 'pos':['r1','c0'], 'selected': false},
      {'id': 1 , 'piece':'bp', 'pos':['r1','c1'], 'selected': false},
      {'id': 2 , 'piece':'bp', 'pos':['r1','c2'], 'selected': false},
      {'id': 3 , 'piece':'bp', 'pos':['r1','c3'], 'selected': false},
      {'id': 4 , 'piece':'bp', 'pos':['r1','c4'], 'selected': false},
      {'id': 5 , 'piece':'bp', 'pos':['r1','c5'], 'selected': false},
      {'id': 6 , 'piece':'bp', 'pos':['r1','c6'], 'selected': false},
      {'id': 7 , 'piece':'bp', 'pos':['r1','c7'], 'selected': false},
      {'id': 8 , 'piece':'br', 'pos':['r0','c0'], 'selected': false},
      {'id': 9 , 'piece':'bn', 'pos':['r0','c1'], 'selected': false},
      {'id': 10, 'piece':'bb', 'pos':['r0','c2'], 'selected': false},
      {'id': 11, 'piece':'bq', 'pos':['r0','c3'], 'selected': false},
      {'id': 12, 'piece':'bk', 'pos':['r0','c4'], 'selected': false},
      {'id': 13, 'piece':'bb', 'pos':['r0','c5'], 'selected': false},
      {'id': 14, 'piece':'bn', 'pos':['r0','c6'], 'selected': false},
      {'id': 15, 'piece':'br', 'pos':['r0','c7'], 'selected': false}
    ];
    let white = [
      {'id': 0 , 'piece':'wp', 'pos':['r7','c0'], 'selected': false},
      {'id': 1 , 'piece':'wp', 'pos':['r7','c1'], 'selected': false},
      {'id': 2 , 'piece':'wp', 'pos':['r7','c2'], 'selected': false},
      {'id': 3 , 'piece':'wp', 'pos':['r7','c3'], 'selected': false},
      {'id': 4 , 'piece':'wp', 'pos':['r7','c4'], 'selected': false},
      {'id': 5 , 'piece':'wp', 'pos':['r7','c5'], 'selected': false},
      {'id': 6 , 'piece':'wp', 'pos':['r7','c6'], 'selected': false},
      {'id': 7 , 'piece':'wp', 'pos':['r7','c7'], 'selected': false},
      {'id': 8 , 'piece':'wr', 'pos':['r8','c0'], 'selected': false},
      {'id': 9 , 'piece':'wn', 'pos':['r8','c1'], 'selected': false},
      {'id': 10, 'piece':'wb', 'pos':['r8','c2'], 'selected': false},
      {'id': 11, 'piece':'wq', 'pos':['r8','c3'], 'selected': false},
      {'id': 12, 'piece':'wk', 'pos':['r8','c4'], 'selected': false},
      {'id': 13, 'piece':'wb', 'pos':['r8','c5'], 'selected': false},
      {'id': 14, 'piece':'wn', 'pos':['r8','c6'], 'selected': false},
      {'id': 15, 'piece':'wr', 'pos':['r8','c7'], 'selected': false}
    ];

    updatePiecesBlack(black);
    updatePiecesWhite(white);
  }

  const updateSettings = () => {
    setSettings(!settings);
  }

  const openDocs = (e) => {
    // open the docs component
    setDocs(!docs);
  }

  const updateCommand = (e) => {
    setCurrCommand(e.target.value);
  }

  const checkKey = (e) => {
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

      switch (method) {
        case 'help':
          const c1 = "command 1";
          const c2 = "command 2";
          const c3 = "command 3";
          updatecommandHistory([...commandHistory, c1, c2, c3]);
          break;
        case 'clear':
          updatecommandHistory([]);
          setCurrCommand("");
          return;
        case 'select':
          // UPDATE-
          // make this set a state variable but also return it
          let piece = piecesBlack.find(piece => {
            return piece.pos[0] === 'r'+params[0] && piece.pos[1] === 'c'+params[1];
          });
          if (piece) {
            piece.selected = true;
            setSelectedPiece(piece);
            rc = piece.piece + ' on ' + piece.pos[0] + ' ' + piece.pos[1] + ' selected.';
            // debugger;
          } else {
            piece = piecesWhite.find(piece => {
              return piece.pos[0] === 'r'+params[0] && piece.pos[1] === 'c'+params[1];
            });
            if (piece) {
              piece.selected = true;
              setSelectedPiece(piece);
              rc = piece.piece + ' on ' + piece.pos[0] + ' ' + piece.pos[1] + ' selected.';
            } else {
              rc = 'invalid position ('+params[0]+','+params[1]+'); make sure the coordinates are within the zero-indexed range and a piece is in that position';
            }
          }
          break;
        case 'unselect':
          let unpiece = piecesBlack.find(unpiece => {
            return unpiece.pos[0] === 'r'+params[0] && unpiece.pos[1] === 'c'+params[1];
          });
          if (unpiece) {
            unpiece.selected = false;
            setSelectedPiece({});
            rc = unpiece.piece + ' on ' + unpiece.pos[0] + ' ' + unpiece.pos[1] + ' unselected.';
          } else {
            unpiece = piecesWhite.find(unpiece => {
              return unpiece.pos[0] === 'r'+params[0] && unpiece.pos[1] === 'c'+params[1];
            });
            if (unpiece) {
              unpiece.selected = false;
              setSelectedPiece({});
              rc = unpiece.piece + ' on ' + unpiece.pos[0] + ' ' + unpiece.pos[1] + ' unselected.';
            } else {
              rc = 'invalid position ('+params[0]+','+params[1]+'); make sure the coordinates are within the zero-indexed range and a piece is in that position.';
            }
          }
          break;
        default:
          updatecommandHistory([...commandHistory, rc]);
          setCurrCommand("");
          return;
      }
      updatecommandHistory([...commandHistory, rc]);
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
        <button className="docs-btn" onClick={openDocs}></button>
        <button className="settings-btn" onClick={updateSettings}></button>
      </header>
      { docs ?
        <Docs theme={theme} /> : <>

        <section className="main">

          { settings &&
            <div className="blackout" onClick={updateSettings}>
              <div className="settings-panel">
                <h1>Settings</h1>
                <div className="theme-picker">
                  <h2>Color Theme</h2>
                  <div className="theme-options">
                    <div id="dark" className="theme dark"></div>
                    <div id="light" className="theme light"></div>
                    <div id="purple" className="theme purple"></div>
                    <div id="blue" className="theme blue"></div>
                    <div id="green" className="theme green"></div>
                    <div id="orange" className="theme orange"></div>
                  </div>
                </div>
                <div className="difficulty-picker">
                  <h2>Difficulty</h2>
                  <div className="difficulty-options">
                    <div className="difficulty">250</div>
                    <div className="difficulty">400</div>
                    <div className="difficulty">500</div>
                    <div className="difficulty">700</div>
                    <div className="difficulty">900</div>
                    <div className="difficulty">1100</div>
                    <div className="difficulty">1400</div>
                    <div className="difficulty">1800</div>
                    <div className="difficulty">2000</div>
                  </div>
                </div>
                <h3>by Josh Bacon</h3>
              </div>
            </div>
          }

          <div className="board">
            {piecesBlack.map((value, key) => {
              return <div key={key} className={"square "+value.piece+" "+value.pos[0]+" "+value.pos[1]+" "+(value.selected?'selected':'')}></div>
            })}
            {piecesWhite.map((value, key) => {
              return <div key={key} className={"square "+value.piece+" "+value.pos[0]+" "+value.pos[1]+" "+(value.selected?'selected':'')}></div>
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
