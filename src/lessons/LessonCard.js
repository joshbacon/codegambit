import './LessonCard.css';
import React from 'react';

const LessonCard = (props) => {
    const data = props.data;

    return <div className='lessonInfo'>
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
}

export default LessonCard;