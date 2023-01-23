import './LessonsPage.css';
import React, {useState} from 'react';
import Board from '../Board.js';
import LessonCard from './LessonCard.js';
import lessons from './lessons.json';
import Editor from './Editor.js';

const Lessons = (props) => {

    // functions go up here
    const [running, updateRunning] = useState(false);

    return <div className='lessonPage'>
        <div className='lesson'>
            { running ? 
                <Board data={{boardTheme: 'bBlue'}}/> : <>
                <div className='lessonVideo' />
                <LessonCard data={lessons[0]}/>
            </> }
        </div>
        <Editor/>
    </div>
}

export default Lessons;