import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Home';
import Game from './Game';
import PuzzleSelector from './PuzzleSelector';
import Puzzle from './Puzzle';
import Docs from './Docs';
import Account from './Account';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/play' element={<Game/>} />
        <Route path='/puzzles' element={<PuzzleSelector/>} />
        <Route path='/puzzle/:id' element={<Puzzle/>} />
        <Route path='/documentation' element={<Docs/>} />
        <Route path='/account' element={<Account/>} />
      </Routes>
    </Router>
  )
}

export default App;