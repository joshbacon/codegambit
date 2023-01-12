import './LessonSelector.css';
import React, {useState} from 'react';
import LessonData from './lessons.json';
import {Link} from 'react-router-dom';

// check here to change the css
// https://github.com/reactjs/react-tabs

// need to set some constant sizing
// make it a list with some items having checkmarks and others... well not
// have individual progress bars for each section
// need actual lessons to fill the data with
// hopefully need to implement scrolling cause there will be so many
// make the list items actual buttons to bring the user to the lesson page

const LessonSelector = (props) => {

    let complete = 90;
    let styleProg = {
        width: complete+"px"
    };

    const tabs = {All: '', General: 'General', Openings: 'Opening', Endgames: 'Endgame'};
    const [active, updateActive] = useState(tabs.All);

    return <div className='lessonSelector'>
        <Link to='/' className='lessonBackBtn'/>
        <div className='lessonTitle'>
            <h2>Josh Bacon</h2>
            <div className='totalProgress'>
                <h3>Total Progress:</h3>
                <div className='progressBar'>
                    <div className='progress' style={styleProg}/>
                </div>
            </div>
        </div>
        <div className='lessonTabs'>
            <ul className='tabs'>
                {Object.entries(tabs).map(([key, value]) => {
                    return <li
                        key={key}
                        className={active === value ? 'tabItem active' : 'tabItem'}
                        onClick={() => {updateActive(value)}}>
                        {key}
                    </li>
                })}
            </ul>

            <ul className='tabPanel'>
                {LessonData.filter(value => {return active === '' || active === value.category}).map((value, key) => {
                    return <li key={value.id} className='lessonItem incomplete'>{value.title} ({value.rating})</li>
                })}
            </ul>
        </div>
    </div>
}

export default LessonSelector;