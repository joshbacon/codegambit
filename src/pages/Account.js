import '../styles/Account.css';
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import Settings from '../components/Settings';

const Account = (props) => {

    // do something to grab the current account from the localStorage
    // return the account page if one exists
    // otherwise show a login signup page

    return <div className='account'>
        <div className='waves'/>
        <Link to='/' className='home button'>
            <div className='homeImg'/>
        </Link>
        <div className='userCard'>
            <h2>Josh Bacon</h2>
            <div className='gameSection'>
                <div className='played section'>
                    <p className='result'>23</p>
                    <p>games played</p>
                </div>
                <div className='won section'>
                    <p className='result'>23</p>
                    <p>games won</p>
                </div>
                <div className='winRate section'>
                    <p className='result'>52%</p>
                    <p>win rate</p>
                </div>
            </div>
            <div className='lessonSection'>
                <p className='result'>12</p>
                <p>Lessons completed</p>
            </div>
        </div>
    </div>
}

export default Account;