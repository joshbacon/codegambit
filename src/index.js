import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, history } from './store/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Home from './pages/Home';
import Game from './pages/Game';
import Multiplayer from './pages/Multiplayer';
import PuzzleSelector from './pages/PuzzleSelector';
import Puzzle from './pages/Puzzle';
import Docs from './pages/Docs';
import Account from './pages/Account';


let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/play' element={<Game/>} />
            <Route path='/multiplayer' element={<Multiplayer/>} />
            <Route path='/puzzles' element={<PuzzleSelector/>} />
            <Route path='/puzzle/:id' element={<Puzzle/>} />
            <Route path='/documentation' element={<Docs/>} />
            <Route path='/account' element={<Account/>} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
