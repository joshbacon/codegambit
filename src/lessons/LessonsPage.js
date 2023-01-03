import './LessonsPage.css';
import React from 'react';
import Board from '../Board.js';
import LessonCard from '../lessons/LessonCard.js';
import Editor from './Editor.js';

const Lessons = (props) => {

    // functions go up here

    return <div className='lessonPage'>
        <div className='lesson'>
            <Board data={{boardTheme: 'bBlue'}}/>
            <LessonCard/>
        </div>
        <Editor/>
    </div>
}

export {Lessons};