import './App.css';

function App() {

  //main page
  return <div className='mainPage'>
    <div className='waves'/>
    <div className='titleBar'>
      <div className='titleImage left'/>
      <h1>Code Gambit</h1>
      <div className='titleImage right'/>
    </div>
    <div className='mainMenu'>
      <div className='menuItem'>
        <div className='game menuImg'/>
        <h2>Play a Game</h2>
      </div>
      <div className='menuItem'>
        <div className='lessons menuImg'/>
        <h2>Lessons</h2>
      </div>
      <div className='menuItem'>
        <div className='docs menuImg'/>
        <h2>Documentation</h2>
      </div>
      <div className='menuItem'>
        <div className='account menuImg'/>
        <h2>Account</h2>
      </div>
    </div>
  </div>

}

export default App;
