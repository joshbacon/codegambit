import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import Game from './GamePage.js';
import LessonSelector from './lessons/LessonSelector.js';
import Docs from './documentation/Docs.js';
import Account from './Account.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/play' element={<Game/>} />
        <Route path='/lessons' element={<LessonSelector/>} />
        <Route path='/documentation' element={<Docs/>} />
        <Route path='/account' element={<Account/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
