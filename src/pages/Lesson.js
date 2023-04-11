import '../styles/Lesson.css';
import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Board from '../components/Board.js';
import LessonCard from '../components/LessonCard.js';
import Editor from '../components/Editor.js';
import lessons from '../data/lessons.json';

import close from '../assets/icons/close.svg';

const Lessons = (props) => {

    const location = useLocation();
    const {lessonId} = location.state;
    console.log(lessonId);

    // functions go up here
    const [running, updateRunning] = useState(false);

    return <div className='lessonPage'>
        <Link to={'/lessons'} className='lesson-close-btn'>
            <img src={close} alt={'back'}/>
        </Link>
        <div className='lesson'>
            { running ? 
                <Board data={{boardTheme: 'bBlue'}}/> : <>
                <div className='lessonVideo' />
                <LessonCard data={lessons[lessonId-1]}/>
            </> }
        </div>
        <Editor setRunning={updateRunning}/>
    </div>
}

export default Lessons;