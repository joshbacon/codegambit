import '../styles/App.css';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function App() {

  // const history = useHistory();

  // function navigate(dest) {
  //   history.push(dest);
  // }

  const [showingPopup, setShowing] = useState(false);

  const showPopup = () => {
    setShowing(true);
    setTimeout(() => {setShowing(false)}, 4000);
  }

  //main page
  return <div className='mainPage'>
    <div className='waves'/>
    <div className='info'>
      <div className='titleBar'>
        <div className='titleImage left'/>
        <h1>code_gambit</h1>
        <div className='titleImage right'/>
      </div>
      <div className='mainMenu'>
        <Link to='/play' state={{game: null}} className='menuItem'>
          <div className='gameBg menuImg'/>
          <h2>Play a Game</h2>
        </Link>
        {/* <Link to='/lessons' className='menuItem'> */}
        <div className='menuItem' onClick={showPopup}>
          <div className='lessonsBg menuImg'/>
          <h2>Lessons</h2>
        </div>
        {/* </Link> */}
        <Link to='/documentation' state={{backPath:'/'}} className='menuItem'>
          <div className='docsBg menuImg'/>
          <h2>Documentation</h2>
        </Link>
        {/* <Link to='/account' className='menuItem'> */}
        <div className='menuItem' onClick={showPopup}>
          <div className='accountBg menuImg'/>
          <h2>Account</h2>
        </div>
        {/* </Link> */}
      </div>
      <div className={'popup'+(showingPopup?' showing':'')} onClick={() => setShowing(false)}>
        <h2>This feature is coming soon</h2>
      </div>
    </div>
  </div>

}

export default App;
