import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home.tsx';
import DocumentationPage from './pages/documentation.tsx';
import SinglePlayer from './pages/singleplayer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/play' element={<SinglePlayer/>} />
        <Route path='/documentation' element={<DocumentationPage/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
