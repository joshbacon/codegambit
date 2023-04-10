import '../styles/LessonsPage.css';
import React, {useState} from 'react';
import Board from '../components/Board.js';
import LessonCard from '../components/LessonCard.js';
import Editor from '../components/Editor.js';
import lessons from '../data/lessons.json';

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