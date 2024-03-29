import '../styles/Home.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

function Home() {
  // const dispatch = useDispatch();
  // let action = {
  //   type: "FIX"
  // };
  // dispatch(action);

  const [playMenu, setPlayMenu] = useState(false);


  return <div className='mainPage'>
    <div className='waves'/>
    <div className='info'>
      <div className='titleBar'>
        <div className='titleImage left'/>
        <h1>code_gambit</h1>
        <div className='titleImage right'/>
      </div>
      <div className='homeMenu'>
        <div className='mainMenu' style={{transform: playMenu?"translateX(-125%)":"translateX(0%)"}}>
          <button onClick={() => setPlayMenu(true)} className='menuItem'>
            <div className='gameBg menuImg'/>
            <h2>Play a Game</h2>
          </button>
          {/* <Link to='/puzzles' className='menuItem'> */}
          <Link to='/' className='menuItem disabled'>
            <div className='puzzlesBg menuImg'/>
            <h2>Puzzles</h2>
          </Link>
          <Link to='/documentation' state={{backPath:'/'}} className='menuItem'>
            <div className='docsBg menuImg'/>
            <h2>Documentation</h2>
          </Link>
          {/* <Link to='/account' className='menuItem'> */}
          <Link to='/' className='menuItem disabled'>
            <div className='accountBg menuImg'/>
            <h2>Account</h2>
          </Link>
        </div>
        <div className='playMenu' style={{transform: playMenu?"translateX(0%)":"translateX(125%)"}}>
          <button onClick={() => setPlayMenu(false)} className='menuItem'>
            <div className='backBg menuImg'/>
            <h2>Back</h2>
          </button>
          <Link to='/play' className='menuItem'>
            <div className='accountBg menuImg'/>
            <h2>Single Player</h2>
          </Link>
          {/* <Link to='/multiplayer' className='menuItem'> */}
          <Link to='/' className='menuItem disabled'>
            <div className='accountBg multi menuImg'/>
            <h2>Multi Player</h2>
          </Link>
        </div>
      </div>
    </div>
  </div>

}

export default Home;
