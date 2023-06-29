import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Gambit from '../chess/Gambit';

const Terminal = (props) => {
    let game = Gambit();

    const {commands, prevCommand} = useSelector(state => state.game);
    const gameCur = useSelector(state => state.game);
    const [currCommand, setCurrCommand] = useState("");

    const updateCommand = (e) => {
        setCurrCommand(e.target.value);
    }

    const checkKey = (e) => {
      console.log(gameCur.game);
        let key = e.key;
        if (key === 'ArrowUp') {
          setCurrCommand(prevCommand);
        } else if (key === 'ArrowDown') {
          setCurrCommand("");
        } else if (key === 'Enter') {
          parseCommand(currCommand);
          setCurrCommand("");
        }
    }

    function parseCommand(command) {
      game.enterCommand(command);
    }

    const ScrollToBottom = () => {
        const scrollRef = useRef();
        useEffect(() => scrollRef.current.scrollIntoView());
        return <tr ref={scrollRef} />;
    }

    return (
        <div className="terminal">
          <table className="command-history">
            <tbody>
              {commands.map((value, key) => {
                return <tr key={key}>
                  <td>{value}</td>
                </tr>
              })}
              <ScrollToBottom />
            </tbody>
          </table>
          <div className="terminal-in">{'>'}
            <input 
              autoFocus={true}
              type="text"
              spellCheck="false"
              value={currCommand}
              onChange={updateCommand}
              onKeyUp={checkKey}
              className="code-in">
            </input>
          </div>
        </div>
    );
}

export default Terminal;