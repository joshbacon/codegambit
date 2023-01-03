import './App.css';
import { useEffect, useState, useRef } from 'react';
import { Docs } from './documentation/Docs.js';
import { Chess } from './chess/chess';
import { Terminal } from './Terminal';
import { Lessons } from './lessons/LessonsPage';

function App() {

  let game = Chess();
  let tmnl = Terminal();

  const [showDocs, setShowDocs] = useState(false);
  const [settings, setSettings] = useState(false);
  const [boardTheme, setBoardTheme] = useState('bBlue');

  const [currCommand, setCurrCommand] = useState("");
  const [commandHistory, updateCommandHistory] = useState([
    'Welcome to code_gambit! We teach coding through playing chess.',
    'type help(method) to see how to use a given method or check out the documentation for a list of commands.',
    'Currently working on: making the main page dynamic, want a breakpoint to put the terminal under the board at some point.',
    'make the look thing in the docs a hamburger menu at a breakpoint (might have to fudge the cards too)',
    'select(A1)',
    'select(A2)',
    'select(A3)',
    'select(A4)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)',
    'select(A5)'
  ]);

  const updateSettings = () => {
    setSettings(!settings);
  }

  const openDocs = () => {
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

  // useEffect(() => {
  //   game = Chess('');
  // }, [])

  return (<Lessons/>);
  // (
  //   <div className="App">

  //     <header className="App-header">
  //       <h1>{'>'}code_gambit</h1>
  //       { showDocs ? <></> :
  //         <button className="settings-btn header-btn" onClick={updateSettings}></button> }
  //       { showDocs ?
  //         <button className="close-btn header-btn" onClick={openDocs}></button> :
  //         <button className="docs-btn header-btn" onClick={openDocs}></button>
  //       }
  //     </header>
  //     { showDocs ?
  //       <Docs/> : <>
  //       <section className="main">
  //         { settings &&
  //           <div className="settings-section">
  //             <div className="settings-panel">
  //               <h1>settings</h1>
  //               <div className="picker">
  //                 <h2>board theme</h2>
  //                 <div className="theme-options">
  //                   <div onClick={() => changeTheme("bDark")}   className="theme dark"></div>
  //                   <div onClick={() => changeTheme("bLight")}  className="theme light"></div>
  //                   <div onClick={() => changeTheme("bPurple")} className="theme purple"></div>
  //                   <div onClick={() => changeTheme("bBlue")}   className="theme blue"></div>
  //                   <div onClick={() => changeTheme("bGreen")}  className="theme green"></div>
  //                   <div onClick={() => changeTheme("bOrange")} className="theme orange"></div>
  //                 </div>
  //               </div>
  //               <div className="picker">
  //                 <h2>bot depth</h2>
  //                 <div className="difficulty-options">
  //                   <div className="difficulty">1</div>
  //                   <div className="difficulty">2</div>
  //                   <div className="difficulty">3</div>
  //                   <div className="difficulty">4</div>
  //                   <div className="difficulty">5</div>
  //                   <div className="difficulty">6</div>
  //                 </div>
  //               </div>
  //               <div className='picker no-light-mode'>
  //                 <h2>window theme</h2>
  //                 <button><h3>switch to light mode</h3></button>
  //               </div>
  //               <div className='picker'>
  //                 <h2>play as...</h2>
  //                 <div className='start-color-options'>
  //                   <button className='start-color white'>white</button>
  //                   <button className='start-color black'>black</button>
  //                   <button className='start-color random'>random</button>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className='background-blur' onClick={updateSettings}></div>
  //           </div>
  //         }

  //         <div className={"board "+boardTheme}>
  //           {game.getPieces().map((value, key) => {
  //             return <div key={key} className={"square "+value.piece+" "+value.pos}></div>
  //           })}
  //           {/* {piecesBlack.map((value, key) => {
  //             return <div key={key} className={"square "+value.piece+" "+value.pos+(value.selected?'selected':'')}></div>
  //           })}
  //           {piecesWhite.map((value, key) => {
  //             return <div key={key} className={"square "+value.piece+" "+value.pos+(value.selected?'selected':'')}></div>
  //           })} */}
  //         </div>

  //         <div className="terminal">
  //           <table className="command-history">
  //             <tbody>
  //               {commandHistory.map((value, key) => {
  //                 return <tr key={key}>
  //                   <td>{value}</td>
  //                 </tr>
  //               })}
  //               <ScrollToBottom />
  //             </tbody>
  //           </table>
  //           <div className="terminal-in">{'>'}
  //             <input
  //               type="text"
  //               // autoCorrect="off"
  //               // autoSuggest="off"
  //               // autoComplete="off"
  //               // autoCapitalize="off"
  //               value={currCommand}
  //               onChange={updateCommand}
  //               onKeyUp={checkKey}
  //               className="code-in">
  //             </input>
  //           </div>
  //         </div>
  //       </section>
  //     </>}
  //   </div>
  //);
}

export default App;
