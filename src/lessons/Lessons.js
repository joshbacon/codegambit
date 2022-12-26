import './Lessons.css';
import React from 'react';
import Editor from './Editor.js';

const Lessons = (props) => {

    // functions go up here

    return <div className='lessonPage'>
        <div className='lesson'>
            <p>Write a script to move the pieces using the London System.</p>
            <p>Here are the moves for both sides:</p>
            <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
            <ol>
                <li>d4</li>
                <li>d5</li>
                <li>Nf3</li>
                <li>Nf6</li>
                <li>Bf4</li>
            </ol>
        </div>
        <Editor/>
    </div>
}

export {Lessons};