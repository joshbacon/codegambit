import './Docs.css';
import DocCard from './DocCard.js'
import DocData from './docs.json';
import React from 'react';

const Docs = (props) => {
    // use the props.theme in the 
    return (
        <div className='docs'>
            <div className='menu-bar'>
                <h1>Documentation</h1>
                {DocData.map((value, key) => {
                    return <div key={key} className='list-section'>
                        <h2>{value.section}</h2>
                        <ul>
                            {value.methods.map((value, key) => {
                                return <li key={key} className='method'> - {value.method}</li>
                            })}
                        </ul>
                    </div>
                })}
            </div>

            <div className='main'>
                {DocData.map((value, key) => {
                    // make a section and map on each of the methods for a card.
                    return <section key={key}>
                        <h2>{value.section}</h2>
                        {value.methods.map((value, key) => {
                            return <DocCard key={key} method={value}/>
                        })}
                    </section>
                })}
            </div>
        </div>
    );
}

export {Docs};