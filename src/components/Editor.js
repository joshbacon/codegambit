import '../styles/Editor.css';
import React, {useState} from 'react';

import run from '../assets/icons/run.svg';

// write the script output somewhere...
// maybe have a run button that brings up a terminal for ouput
// - should stop script when an error occurs
// - will probably want better error messages with line numbers
// also need a grade

const Editor = (props) => {
    const data = props.data;
    const [script, updateScript] = useState('Testing testing Im just suggesting');

    let numbers = '';
    for (let i = 1; i < 101; i++) numbers += i+'. ';

    function update(e) {
        // Update script in state
        updateScript(e.target.value);
        // Update the color of of elements in the IDE
        
    }

    function runScript() {
        // parse the entered script
        // look to above comments
        props.setRunning(true);
        setTimeout(() => {
            props.setRunning(false);
        }, 2000);
    }

    return <div className='editor'>
        <div className='scriptScroller'>
            <div className='script-number'>
                {script.split(/\r?\n/).map((value, index) => {
                    return <div key={index}>{index+1}</div>
                })}
            </div>
            <textarea
                className='ide'
                onChange={update}
                value={script}>
            </textarea>
        </div>
        <div className='scriptMenu'>
            <button className='runButton' onClick={runScript}>
                <img src={run} alt={'run button'}/>
            </button>
        </div>
    </div>

}

export default Editor;