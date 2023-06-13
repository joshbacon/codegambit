import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import App from './pages/App';
import Game from './pages/Game';
import PuzzleSelector from './pages/PuzzleSelector';
import Puzzle from './pages/Puzzle';
import Docs from './pages/Docs';
import Account from './pages/Account';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='/play' element={<Game/>} />
          <Route path='/puzzles' element={<PuzzleSelector/>} />
          <Route path='/puzzle/:id' element={<Puzzle/>} />
          <Route path='/documentation' element={<Docs/>} />
          <Route path='/account' element={<Account/>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
