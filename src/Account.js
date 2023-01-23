import './Account.css';
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import Settings from './Settings';

const Account = (props) => {

    // do something to grab the current account from the localStorage
    // return the account page if one exists
    // otherwise show a login signup page

    // const [settings, toggleSettings] = useState(false);

    return <div className='account'>
        <div className='waves'/>
        {/* { settings && <Settings/> } */}
        <Link to='/' className='home button'>
            <div className='homeImg'/>
        </Link>
        {/* <button onClick={() => toggleSettings(!settings)} className='settings button'>
            <div className='settingsImg' />
        </button> */}
        <h1>THIS IS YOUR ACCOUNT</h1>
    </div>
}

export default Account;