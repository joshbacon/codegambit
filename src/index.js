import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import App from './pages/App';
import Game from './pages/Game';
import LessonSelector from './pages/LessonSelector';
import Lesson from './pages/Lesson';
import Docs from './pages/Docs';
import Account from './pages/Account';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/play' element={<Game/>} />
        <Route path='/lessons' element={<LessonSelector/>} />
        <Route path='/lesson/:id' element={<Lesson/>} />
        <Route path='/documentation' element={<Docs/>} />
        <Route path='/account' element={<Account/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
