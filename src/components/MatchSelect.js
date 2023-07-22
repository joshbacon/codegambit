import { useState } from 'react';
import '../styles/MatchSelect.css';

import wp from '../assets/images/pieces/wp.png';
import wq from '../assets/images/pieces/wq.png';
import bp from '../assets/images/pieces/bp.png';
import bq from '../assets/images/pieces/bq.png';

const MatchSelect = ({matches}) => {

    const [creating, setCreating] = useState(false);
    const [selected, setSelected] = useState('');
    const [search, updateSearch] = useState('');
    const [chat, updateChat] = useState(['Hey', 'Hey you ready?', 'Yup! Let\'s go']);

    const joinMatch = (match = selected) => {
        if (match === '') {
            console.log('joining random');
        } else {
            console.log('joining ',selected);
        }
    }

    // in create
    // - have options, basically just black and white (lobby creator can decide)
    // - also need a ready button (start when both are ready)
    // - show the creators name under the color name with the pawn image
    // - bring acceptor to this page when they enter a lobby
    // - have a little chat thing?

    return <div className='selector'>
        <div className='types'>
            <button className={'menuItem'+(creating?'':' selectedType')} onClick={() => setCreating(false)}>
                <div className='accountBg menuImg'/>
                <h2>join match</h2>
            </button>
            <button className={'menuItem'+(creating?' selectedType':'')} onClick={() => setCreating(true)}>
                <div className='settingsBg menuImg'/>
                <h2>create match</h2>
            </button>
        </div>
        <div className='matches' style={{transform: creating?"translateX(125%)":"translateX(0%)"}}>
            <input type='text' placeholder='search' onChange={e => updateSearch(e.target.value)}/>
            {matches.filter(m => m.toLowerCase().includes(search)).length > 0 ?
                <ul className='matchList'>
                    {matches.filter(m => m.toLowerCase().includes(search)).map(m => {
                        return <li className={'match'+(m === selected?' selectedMatch':'')} onClick={() => setSelected(m===selected?'':m)}>
                            {m}
                        </li>
                    })}
                </ul> :
                <h2 className='matchList'>No matches</h2>
            }
            <button className='menuItem' disabled={selected === ''} onClick={() => joinMatch()}>
                <div className='playBg menuImg'/>
                <h1>Play</h1>
            </button>
            <button className='menuItem' onClick={() => joinMatch('')}>
                <div className='randomBg menuImg'/>
                <h1>Random</h1>
            </button>
            <button></button>
        </div>
        <div className='create' style={{transform: creating?"translateX(0%)":"translateX(-125%)"}}>
            <div className='whitePlayer'>
                <img src={wq} />
                <h2>white</h2>
                <h1>Bacon</h1>
                <button className='menuItem'>
                    <img src={wp}/>
                    <h3>Play as white</h3>
                </button>
            </div>
            <div className='blackPlayer'>
                <img src={bq} />
                <h2>black</h2>
                <h1>Nick</h1>
                <button className='menuItem'>
                    <img src={bp} />
                    <h3>Play as black</h3>
                </button>
            </div>
            <button className='menuItem'>
                <div className='gameBg menuImg'/>
                <h1>Ready</h1>
            </button>
            <div className='chat'>
                <ul>
                    {chat.map(c => <li>
                        <p>{c}</p>
                    </li>)}
                </ul>
                <input placeholder='type a message' />
            </div>
        </div>
    </div>
}

export default MatchSelect;