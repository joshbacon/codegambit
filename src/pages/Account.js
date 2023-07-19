import '../styles/Account.css';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import pb from '../api/pocketbase';
import Login from '../components/Login';
import useLogout from '../hooks/useLogout';
import UserCard from '../components/UserCard';
import Settings from '../components/Settings';

import back from '../assets/icons/back.svg';

const Account = (props) => {
    const logout = useLogout();

    const [loggedIn, setLoggedIn] = useState(pb.authStore.isValid);

    return <div className='account'>
        <div className='waves'/>
        <Link to='/' className='home button'>
            <img src={back} alt='Back button' className='homeImg'/>
        </Link>
        { !loggedIn ?
            <Login onLogin={(result) => setLoggedIn(result)}/> :
            <>
                <UserCard />
                <button onClick={() => {
                    let result = logout();
                    console.log(result);
                    setLoggedIn(result);
                }}>Logout</button>
            </>
        }
    </div>
}

export default Account;