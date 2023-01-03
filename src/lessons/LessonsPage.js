import './LessonsPage.css';
import React from 'react';
import Board from '../Board.js';
import LessonCard from './LessonCard.js';
import lessons from './lessons.json';
import Editor from './Editor.js';

const Lessons = (props) => {

    // functions go up here

    return <div className='lessonPage'>
        <div className='lesson'>
            <LessonCard data={lessons[0]}/>
            <Board data={{boardTheme: 'bBlue'}}/>
        </div>
        <Editor/>
    </div>
}

export {Lessons};