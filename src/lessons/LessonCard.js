import './LessonCard.css';
import React from 'react';

const LessonCard = (props) => {
    const data = props.data;

    return <div className='lessonInfo'>
        <p>{data.title} ({data.rating} level)</p>
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