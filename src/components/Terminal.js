import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Gambit from '../chess/Gambit';

export const Terminal = (props) => {
    let game = Gambit(props.state);
    // console.log(props.state)

    const {commands} = useSelector(state => state.game);
    const dispatch = useDispatch();
    let backAmount = 0;

    // let commandHistory = [
    //     'Welcome to code_gambit! We teach coding through playing chess.',
    //     'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
    // ];
    
    const [currCommand, setCurrCommand] = useState("");

    const updateCommand = (e) => {
        setCurrCommand(e.target.value);
    }

    const checkKey = (e) => {
        let key = e.key;
        // console.log(key);
        if (key === 'ArrowUp') {
            backAmount += 1;
        // let newCommand = getPreviousCommand(backAmount);
        // if (newCommand !== currCommand)
        //     setCurrCommand(newCommand);
        // else
        //     backAmount -= 1;
        } else if (key === 'Enter') {
            parseCommand(currCommand);
            setCurrCommand("");
            backAmount = 0;
            // console.log("I RAN")
        }
        // console.log(backAmount)
    }

    function parseCommand(command) {

        let result = game.enterCommand(command);
        // console.log(result);
        // else if (result === '')
        //     pass
        // else 
        //     commandHistory.push("Segmentation fault (core dumped)")
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