import { useState } from 'react';
import { Link } from 'react-router-dom';

import waves from '../assets/images/wavesOpacity.svg';
import wPawn from '../assets/images/pieces/wp.png';
import bPawn from '../assets/images/pieces/bp.png';
import gameIcon from '../assets/icons/game.svg';
import puzzleIcon from '../assets/icons/puzzle.svg';
import documentationIcon from '../assets/icons/docs.svg';
import scriptIcon from '../assets/icons/script.svg';
import accountIcon from '../assets/icons/user.svg';
import backIcon from '../assets/icons/back.svg';

function HomePage() {

    const [showPlayMenu, setPlayMenu] = useState<boolean>(false);

    const disabledStyle:String = ' opacity-25 cursor-default hover:bg-transparent';

    return<div className="w-full h-screen py-5 overflow-x-hidden flex flex-col gap-20 justify-center items-center text-green-700">
      <img src={waves} className="w-full absolute top-0" />

      <div className='relative flex gap-3 place-items-center h-22'>
        <img src={wPawn} className="opacity-0 sm:opacity-100 absolute -left-25 sm:relative sm:left-0 aspect-square transition-opacity transition-width duration-500" />
        <h1 className="font-bold text-5xl drop-shadow-[0_3px_3px_rgba(0,0,0,1)]">code_gambit</h1>
        <img src={bPawn} className="opacity-0 sm:opacity-100 absolute -right-25 sm:relative sm:right-0 aspect-square transition-opacity transition-width duration-500" />
      </div>

      <div className='relative bg-neutral-800 rounded-2xl p-5 flex overflow-x-hidden'>
        
        <div className={`flex flex-col gap-2 w-full transition-all duration-1000 ease-in-out ${!showPlayMenu ? '' : '-translate-x-[125%] opacity-0'}`}>
          <button onClick={() => setPlayMenu(true)} className='grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2 cursor-pointer'>
            <img src={gameIcon} className="w-12 aspect-square" />
            <h2 className='font-bold text-2xl col-span-2 pr-2'>Play a Game</h2>
          </button>
          <Link to="/puzzles" className='grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2'>
            <img src={puzzleIcon} className="w-12 aspect-square" />
            <h2 className='font-bold text-2xl col-span-2 pr-2'>Puzzles</h2>
          </Link>
          <Link to="/scripting" className='grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2'>
            <img src={scriptIcon} className="w-12 aspect-square" />
            <h2 className='font-bold text-2xl col-span-2 pr-2'>Scripting</h2>
          </Link>
          <Link to="/documentation" className='grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2'>
            <img src={documentationIcon} className="w-12 aspect-square" />
            <h2 className='font-bold text-2xl col-span-2 pr-2'>Documentation</h2>
          </Link>
          <Link to="/" className={'grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2' + disabledStyle}>
            <img src={accountIcon} className="w-12 aspect-square" />
            <h2 className='font-bold text-2xl col-span-2 pr-2'>Account</h2>
          </Link>
        </div>

        <div className={`flex flex-col gap-2 absolute transition-all duration-1000 ease-in-out ${!showPlayMenu ? 'translate-x-[125%] opacity-0 -z-10' : 'z-10'}`}>
          <button onClick={() => setPlayMenu(false)} className='w-[262px] grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2 cursor-pointer'>
            <img src={backIcon} className="w-12 aspect-square" />
            <h2 className='font-bold text-2xl col-span-2'>Back</h2>
          </button>
          <Link to="/play" className='grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2'>
            <img src={accountIcon} className="w-12 aspect-square" />
            <h2 className='font-bold text-2xl col-span-2'>Single Player</h2>
          </Link>
          <Link to="/" className={'grid grid-cols-3 place-items-center hover:bg-neutral-900 rounded-lg p-2' + disabledStyle}>
            <div>
              <img src={accountIcon} className="w-12 aspect-square" />
              <img src={accountIcon} className="w-12 aspect-square absolute translate-x-2 -translate-y-13" />
            </div>
            <h2 className='font-bold text-2xl col-span-2'>Multiplayer</h2>
          </Link>
        </div>

      </div>

    </div>
}

export default HomePage;