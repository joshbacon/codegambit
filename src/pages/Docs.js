import '../styles/Docs.css';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import DocCard from '../components/DocCard.js';
import DocData from '../data/docs.json';


const Docs = (props) => {

    const location = useLocation();
    const {backPath, FEN} = location.state;

    const scrollTo = (div) => {
        document.getElementById(div).scrollIntoView({
            behavior: "smooth",
            inline: "center"
        });

        document.getElementById(div).className = document.getElementById(div).className + ' scrolled'
        setTimeout(() => {
            document.getElementById(div).className = document.getElementById(div).className.replace(' scrolled', '');
        }, 2000);
    }

    return <div className='docPage'>
        <header>
            <h1>{'>'}code_gambit</h1>
            <Link to={backPath} state={{FEN:FEN}} className='back-btn header-btn'>
                <div className='backImg header-btn'/>
            </Link>
        </header>
        <div className='docs'>
            <div className='menu-bar'>
                <h1>Documentation</h1>
                {DocData.map((value, key) => {
                    return <div key={key} className='list-section'>
                        <h2 onClick={() => scrollTo(value.section)}>{value.section}</h2>
                        <ul>
                            {value.methods.map((value, key) => {
                                return <li
                                    key={key}
                                    onClick={ () => scrollTo(value.method) }
                                    className='list-method'>
                                    - {value.method}
                                </li>
                            })}
                        </ul>
                    </div>
                })}
                <h3 className='author'>by Josh Bacon</h3>
            </div>
            
            <div className='scroll-box'>
                <div className='doc-column'>
                    {DocData.map((value, key) => {
                        return <DocCard key={key} data={value}/>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default Docs;