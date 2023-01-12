import './Editor.css';
import React, {useState} from 'react';

// write the script output somewhere...
// maybe have a run button that brings up a terminal for ouput
// - should stop script when an error occurs
// - will probably want better error messages with line numbers
// also need a grade

const Editor = (props) => {
    const data = props.data;
    const [script, updateScript] = useState('Testing testing Im just suggesting');

    let numbers = '';
    for (let i = 1; i < 100; i++) numbers += i+'. ';

    function update(e) {
        // Update script in state
        updateScript(e.target.value);
        // Update the color of of elements in the IDE
        
    }

    function runScript() {
        // parse the entered script
        // look to above comments
    }

    return <div className='editor'>
    <div className='scriptScroller'>
        <div className='numbering'>{numbers}</div>
        <textarea
            className='ide'
            onChange={update}
            value={script}>
        </textarea>
    </div>
    <div className='scriptMenu'>
        <button className='runButton' onClick={runScript}></button>
    </div>
    </div>

}

export default Editor;