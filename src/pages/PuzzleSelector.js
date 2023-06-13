import '../styles/PuzzleSelector.css';
import React, { useState } from 'react';
import PuzzleData from '../data/puzzles.json';
import { Link } from 'react-router-dom';

import back from '../assets/icons/back.svg';

// check here to change the css
// https://github.com/reactjs/react-tabs

// need to set some constant sizing
// make it a list with some items having checkmarks and others... well not
// have individual progress bars for each section
// need actual puzzles to fill the data with
// hopefully need to implement scrolling cause there will be so many
// make the list items actual buttons to bring the user to the puzzle page

const PuzzleSelector = (props) => {

    let complete = 90;
    let styleProg = {
        width: complete+"px"
    };

    const tabs = {All: '', General: 'General', Openings: 'Opening', Endgames: 'Endgame'};
    const [active, updateActive] = useState(tabs.All);

    const handleSelect = () => {

    }

    return <div className='lessonSelector'>
        <header>
            <h3>Puzzles</h3>
            <Link to='/' className='lessonBackBtn'>
                <img src={back} alt='back button'/>
            </Link>
        </header>
        <div className='lessonList'>
            <div className='lessonTitle'>
                <h2>Josh Bacon</h2>
                <div className='totalProgress'>
                    <h3>Total Progress: </h3>
                    <div className='progressBar'>
                        <div className='progress' style={styleProg}/>
                    </div>
                </div>
            </div>
            <h2>Select a lesson below to get started!</h2>
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
                    {PuzzleData.filter(value => {return active === '' || active === value.category}).map((value, key) => {
                        return <li
                            key={value.id}
                            className='lessonItem incomplete'
                            onClick={handleSelect}>
                                <Link to={'/lesson/'+value.id} state={{lessonId: value.id}}>
                                    {value.title} ({value.rating})
                                </Link>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </div>
}

export default PuzzleSelector;