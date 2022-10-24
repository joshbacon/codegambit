import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const pieceOffset = 90;

  const [settings, setSettings] = useState(false);

  const [piecesBlack, updatePiecesBlack] = useState([]);
  const [piecesWhite, updatePiecesWhite] = useState([]);

  const [currCommand, setCurrCommand] = useState("");
  const [commandList, updateCommandList] = useState([]);

  // Places pieces in their starting positions
  const initGame = (e) => {
    let black = [
      //    piece        row col
      {'id': 0 , 'piece':'bp', 'pos':(1,0)},
      {'id': 1 , 'piece':'bp', 'pos':(1,1)},
      {'id': 2 , 'piece':'bp', 'pos':(1,2)},
      {'id': 3 , 'piece':'bp', 'pos':(1,3)},
      {'id': 4 , 'piece':'bp', 'pos':(1,4)},
      {'id': 5 , 'piece':'bp', 'pos':(1,5)},
      {'id': 6 , 'piece':'bp', 'pos':(1,6)},
      {'id': 7 , 'piece':'bp', 'pos':(1,7)},
      {'id': 8 , 'piece':'br', 'pos':(0,0)},
      {'id': 9 , 'piece':'bn', 'pos':(0,1)},
      {'id': 10, 'piece':'bb', 'pos':(0,2)},
      {'id': 11, 'piece':'bq', 'pos':(0,3)},
      {'id': 12, 'piece':'bk', 'pos':(0,4)},
      {'id': 13, 'piece':'bb', 'pos':(0,5)},
      {'id': 14, 'piece':'bn', 'pos':(0,6)},
      {'id': 15, 'piece':'br', 'pos':(0,7)}
    ];
    let white = [
      //    piece        row col
      {'id': 0 , 'piece':'wp', 'pos':(7,0)},
      {'id': 1 , 'piece':'wp', 'pos':(7,1)},
      {'id': 2 , 'piece':'wp', 'pos':(7,2)},
      {'id': 3 , 'piece':'wp', 'pos':(7,3)},
      {'id': 4 , 'piece':'wp', 'pos':(7,4)},
      {'id': 5 , 'piece':'wp', 'pos':(7,5)},
      {'id': 6 , 'piece':'wp', 'pos':(7,6)},
      {'id': 7 , 'piece':'wp', 'pos':(7,7)},
      {'id': 8 , 'piece':'wr', 'pos':(8,0)},
      {'id': 9 , 'piece':'wn', 'pos':(8,1)},
      {'id': 10, 'piece':'wb', 'pos':(8,2)},
      {'id': 11, 'piece':'wq', 'pos':(8,3)},
      {'id': 12, 'piece':'wk', 'pos':(8,4)},
      {'id': 13, 'piece':'wb', 'pos':(8,5)},
      {'id': 14, 'piece':'wn', 'pos':(8,6)},
      {'id': 15, 'piece':'wr', 'pos':(8,7)}
    ];

    updatePiecesBlack(black);
    updatePiecesWhite(white);
  }

  const updateSettings = (e) => {
    setSettings(!settings);
  }

  const updateCommand = (e) => {
    let command = e.target.value;
    setCurrCommand(command);
  }

  const checkKey = (e) => {
    var key = e.key;
    // console.log(e.key);
    if (key === 'Enter'){

      if (currCommand === "help()") {
        const c1 = "move(p, r, c) - moves p to the specified position if it is a valid move";
        updateCommandList([...commandList, currCommand, c1]);
      } else {
        updateCommandList([...commandList, currCommand]);
      }

      setCurrCommand("");
    }
  }

  useEffect(() => {
    initGame();
  }, [])

  return (
    <div className="App">

      <header className="App-header">
        <h1>>code_gambit</h1>
        <button className="settings" onClick={updateSettings}></button>
      </header>

      <section className="main">

        { settings &&
          <div className="blackout" onClick={updateSettings}>
            <div className="settingsPanel">
              <h1>Settings</h1>
              <p>by Josh Bacon</p>
            </div>
          </div>
        }

        <div className="board">
          <div className="square br"></div>
          <div className="square bn"></div>
          <div className="square bb"></div>
          <div className="square bq"></div>
          <div className="square bk"></div>
          <div className="square bb"></div>
          <div className="square bn"></div>
          <div className="square br"></div>

          <div className="square bp"></div>
          <div className="square bp"></div>
          <div className="square bp"></div>
          <div className="square bp"></div>
          <div className="square bp"></div>
          <div className="square bp"></div>
          <div className="square bp"></div>
          <div className="square bp"></div>

          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>

          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>

          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>
          <div className="square"/>

          <div className="square wp"></div>
          <div className="square wp"></div>
          <div className="square wp"></div>
          <div className="square wp"></div>
          <div className="square wp"></div>
          <div className="square wp"></div>
          <div className="square wp"></div>
          <div className="square wp"></div>

          <div className="square wr"></div>
          <div className="square wn"></div>
          <div className="square wb"></div>
          <div className="square wq"></div>
          <div className="square wk"></div>
          <div className="square wb"></div>
          <div className="square wn"></div>
          <div className="square wr"></div>
        </div>

        <div className="terminal">
          <div className="command-history">
            <div className="typed">
              Welcome to code_gambit! We teach coding through playing chess.
            </div>
            <div className="typed delay">
              type help() for a list of commands.
            </div><br/>
            {commandList.map((value, key) => {
              return <div key={key} className="typed">
                {value}
              </div>
            })}
          </div>
          <input
            type="text"
            value={currCommand}
            onChange={updateCommand}
            onKeyUp={checkKey}
            className="code-in">
          </input>
        </div>
      </section>

    </div>
  );
}

export default App;
