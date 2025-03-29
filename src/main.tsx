import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from './store/store';
import { Provider } from 'react-redux';

import HomePage from './pages/home.tsx';
import SinglePlayerPage from './pages/singleplayer.tsx';
import PuzzlesPage from './pages/puzzles.tsx';
import ScriptingPage from './pages/scripting.tsx';
import DocumentationPage from './pages/documentation.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/play' element={<SinglePlayerPage/>} />
          <Route path='/puzzles' element={<PuzzlesPage/>} />
          <Route path='/scripting' element={<ScriptingPage/>} />
          <Route path='/documentation' element={<DocumentationPage/>} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
