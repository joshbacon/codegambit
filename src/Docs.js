import './Docs.css';
import DocCard from './DocCard.js'
import DocData from './docs.json';
import React from 'react';


const Docs = (props) => {

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

    return (
        <div className='docs'>
            <div className='menu-bar'>
                <h1>Documentation</h1>
                {DocData.map((value, key) => {
                    return value.section !== 'Secret' || props.secret ?
                        <div key={key} className='list-section'>
                        <h2 onClick={() => scrollTo(value.section)}>{value.section}</h2>
                        <ul>
                            {value.methods.map((value, key) => {
                                return <li key={key} onClick={() => scrollTo(value.method)} className='list-method'> - {value.method}</li>
                            })}
                        </ul>
                    </div> :
                    <></>
                })}
                <h3 className='author'>by Josh Bacon</h3>
            </div>

            <div className='scroll-box'>
                <div className='doc-column'>
                    {DocData.map((value, key) => {
                        return value.section !== 'Secret' || props.secret ? <DocCard key={key} data={value}/> : <></>
                    })}
                </div>
            </div>
        </div>
    );
}

export {Docs};