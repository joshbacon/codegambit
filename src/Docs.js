import './Docs.css';
import { DocCard } from './DocCard.js'
import React from 'react';

const Docs = (props) => {
    // use the props.theme in the 
    return (
        <div className='docs'>
            <div className='menu-bar'>
                <h1>Documentation</h1>
                <div className='list-section'>
                    <h2>Selection</h2>
                    <ul>
                        <li className='method'> - select()</li>
                        <li className='method'> - selected()</li>
                        <li className='method'> - unselect()</li>
                    </ul>
                </div>
                <div className='list-section'>
                    <h2>Movement</h2>
                    <ul>
                        <li className='method'> - move()</li>
                        <li className='method'> - take()</li>
                    </ul>
                </div>
                <div className='list-section'>
                    <h2>Checking</h2>
                    <ul>
                        <li className='method'> - isValidMove()</li>
                        <li className='method'> - showValidMoves()</li>
                    </ul>
                </div>
                <div className='list-section'>
                    <h2>Gameplay</h2>
                    <ul>
                        <li className='method'> - offerDraw()</li>
                        <li className='method'> - resign()</li>
                    </ul>
                </div>
            </div>

            <div>
                <section className='selection'>
                    <h1>Selection</h1>
                    <p></p>
                </section>
                <section className='movement'>
                    <h1>Movement</h1>
                </section>
                <section className='checking'>
                    <h1>Checking</h1>
                </section>
                <section className='gameplay'>
                    <h1>Gameplay</h1>
                </section>
            </div>
        </div>
    );
}

export {Docs};