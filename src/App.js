import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Docs } from './Docs.js';

function App() {

  const [secrets, setsecrets] = useState(false);

  const [showDocs, setShowDocs] = useState(false);
  const [settings, setSettings] = useState(false);
  const [theme, setTheme] = useState('dark');

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
    ]);
    updatePiecesWhite([
      {'id': 0 , 'piece':'wp', 'pos':['r6','c0'], 'selected': false},
      {'id': 1 , 'piece':'wp', 'pos':['r6','c1'], 'selected': false},
      {'id': 2 , 'piece':'wp', 'pos':['r6','c2'], 'selected': false},
      {'id': 3 , 'piece':'wp', 'pos':['r6','c3'], 'selected': false},
      {'id': 4 , 'piece':'wp', 'pos':['r6','c4'], 'selected': false},
      {'id': 5 , 'piece':'wp', 'pos':['r6','c5'], 'selected': false},
      {'id': 6 , 'piece':'wp', 'pos':['r6','c6'], 'selected': false},
      {'id': 7 , 'piece':'wp', 'pos':['r6','c7'], 'selected': false},
      {'id': 8 , 'piece':'wr', 'pos':['r7','c0'], 'selected': false},
      {'id': 9 , 'piece':'wn', 'pos':['r7','c1'], 'selected': false},
      {'id': 10, 'piece':'wb', 'pos':['r7','c2'], 'selected': false},
      {'id': 11, 'piece':'wq', 'pos':['r7','c3'], 'selected': false},
      {'id': 12, 'piece':'wk', 'pos':['r7','c4'], 'selected': false},
      {'id': 13, 'piece':'wb', 'pos':['r7','c5'], 'selected': false},
      {'id': 14, 'piece':'wn', 'pos':['r7','c6'], 'selected': false},
      {'id': 15, 'piece':'wr', 'pos':['r7','c7'], 'selected': false}
    ]);
  }

  const updateSettings = () => {
    setSettings(!settings);
  }

  const openDocs = () => {
    // open the docs component
    setShowDocs(!showDocs);
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


      switch (method) {
        case 'revealYourGambit':
          setsecrets(true);
          break;
        case 'help':
          const c1 = " - select(r, c) : selects a piece at the given position if one exists. note this method both sets the selected piece and returns it.";
          const c2 = " - unselect()   : unselects the currently selected piece if one exists.";
          const c3 = " - move(r, c)   : moves the selected piece to the specified square iff it is a valid move.";
          updateCommandHistory([...commandHistory, c1, c2, c3]);
          break;
        case 'clear':
          updateCommandHistory([]);
          break;
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
          updateCommandHistory([...commandHistory, rc]);
          break;
        case 'selected':
          if (JSON.stringify(selectedPiece) === '{}'){
            rc = 'selected = null';
          } else {
            rc = 'currently selected = ['+selectedPiece.piece+','+selectedPiece.pos[0]+','+selectedPiece.pos[1]+'].'
          }
          updateCommandHistory([...commandHistory, rc]);
          break;
        case 'unselect':
          let unpiece = piecesBlack.find(unpiece => {
            return unpiece.selected;
          });
          if (unpiece) {
            unpiece.selected = false;
            setSelectedPiece({});
            rc = unpiece.piece + ' on ' + unpiece.pos[0] + ' ' + unpiece.pos[1] + ' unselected.';
          } else {
            unpiece = piecesWhite.find(unpiece => {
              return unpiece.selected;
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
        case 'move':
          if (!selectedPiece) { // set err message and return if no piece is selected
            rc = 'there is currently no piece selected.';
            updateCommandHistory([...commandHistory, rc]);
            return;
          }

          if (isValidMove(params[0], params[1])) {
            let temp = piecesBlack.find(piece => {
              return piece === selectedPiece;
            });
            if (temp) {
              rc = selectedPiece.piece+' moved from ('+temp.pos[0]+','+temp.pos[1]+') to (r'+params[0]+',c'+params[1]+').';
              temp.pos = ['r'+params[0], 'c'+params[1]];
              temp.selected = false;
              setSelectedPiece({});
              debugger;
            } else {
              temp = piecesWhite.find(piece => {
                return piece === selectedPiece;
              });
              if (temp) {
                rc = selectedPiece.piece+' moved from ('+temp.pos[0]+','+temp.pos[1]+') to (r'+params[0]+',c'+params[1]+').';
                temp.pos = ['r'+params[0], 'c'+params[1]];
                temp.selected = false;
                setSelectedPiece({});
                debugger;
              }
            }
          } else {
            rc = 'move('+params[0]+' '+params[1]+') is not a valid move.';
          }
          updateCommandHistory([...commandHistory, rc]);
          debugger;
          break;
        default:
          updateCommandHistory([...commandHistory, rc]);
          setCurrCommand("");
          return;
      }
      setCurrCommand("");
    }
  }

  const isValidMove = (r, c) => {
    return true;
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
        <Docs theme={theme} secret={secrets} /> : <>
        <section className="main">
          { settings &&
            <div className="settings-section">
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
                  <h2>Depth</h2>
                  <div className="difficulty-options">
                    <div className="difficulty">1</div>
                    <div className="difficulty">2</div>
                    <div className="difficulty">3</div>
                    <div className="difficulty">4</div>
                    <div className="difficulty">5</div>
                    <div className="difficulty">6</div>
                  </div>
                </div>
                <h3></h3>
              </div>
              <div className='background-blur' onClick={updateSettings}></div>
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
