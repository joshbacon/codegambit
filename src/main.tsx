import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home.tsx';
import SinglePlayerPage from './pages/singleplayer.tsx';
import ScriptingPage from './pages/scripting.tsx';
import DocumentationPage from './pages/documentation.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/play' element={<SinglePlayerPage/>} />
        <Route path='/scripting' element={<ScriptingPage/>} />
        <Route path='/documentation' element={<DocumentationPage/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
