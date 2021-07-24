import React from 'react';
import './TetrisApp.css';
import {TilesBoard} from '../Molecules/TilesBoard';

//***********************************
// Tetris APPコンポーネント
//***********************************
export const TetrisApp: React.FC = () => {

  return (
    <div className="App">
      Hello, Tetris APP.
      <TilesBoard  width={11} height={25}  />
    </div>
  );
}
