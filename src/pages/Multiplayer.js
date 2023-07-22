import '../styles/Game.css';
import '../styles/Board.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import MatchSelect from '../components/MatchSelect';

import docs from '../assets/icons/docs.svg';
import back from '../assets/icons/back.svg';


const Multiplayer = () => {

    useEffect(() => {
        let socket = new WebSocket('ws://localhost:8080/ws');

        socket.onopen = () => {
            console.log('connected!');
            socket.send('hi from client');
        }
    
        socket.onclose = (event) => {
            console.log('closed socket ', event);
        }
    
        socket.onerror = (error) => {
            console.log('closed socket ', error);
        }
    }, []);

    // get these from the socket... or api?
    let matches = ['Bacon', 'Nick', 'luke'];
  
    return (
        <div className="game">
            <div className='waves'/>
            <Link to='/' className='backButton'>
                <img src={back} alt='Back button' className='homeImg'/>
            </Link>
            <section className="selectScreen">
                <MatchSelect matches={matches}/>
            </section>
        </div>
    );
}

export default Multiplayer;