import React from 'react';
import { useState } from 'react';
import '../styles/Settings.css';

const Settings = (props) => {
    const [boardTheme, setBoardTheme] = useState('bBlue');
    const [settings, setSettings] = useState(false);

    const changeTheme = (newTheme) => {
      setBoardTheme(newTheme);
    }

    const updateSettings = () => {
      setSettings(!settings);
    }

    return <div className="settings-section">
        <div className="settings-panel">
        <h1>settings</h1>
        <div className="picker">
            <h2>board theme</h2>
            <div className="theme-options">
            <div onClick={() => changeTheme("bDark")}   className="theme dark"></div>
            <div onClick={() => changeTheme("bLight")}  className="theme light"></div>
            <div onClick={() => changeTheme("bPurple")} className="theme purple"></div>
            <div onClick={() => changeTheme("bBlue")}   className="theme blue"></div>
            <div onClick={() => changeTheme("bGreen")}  className="theme green"></div>
            <div onClick={() => changeTheme("bOrange")} className="theme orange"></div>
            </div>
        </div>
        <div className="picker">
            <h2>bot depth</h2>
            <div className="difficulty-options">
            <div className="difficulty">1</div>
            <div className="difficulty">2</div>
            <div className="difficulty">3</div>
            <div className="difficulty">4</div>
            <div className="difficulty">5</div>
            <div className="difficulty">6</div>
            </div>
        </div>
        <div className='picker no-light-mode'>
            <h2>window theme</h2>
            <button><h3>switch to light mode</h3></button>
        </div>
        <div className='picker'>
            <h2>play as...</h2>
            <div className='start-color-options'>
            <button className='start-color white'>white</button>
            <button className='start-color black'>black</button>
            <button className='start-color random'>random</button>
            </div>
        </div>
        </div>
        <div className='background-blur' onClick={updateSettings}></div>
    </div>
}

export default Settings;