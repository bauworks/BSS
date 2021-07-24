import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TetrisApp} from './Organisms/TetrisApp';

ReactDOM.render(
  <React.StrictMode>
    <TetrisApp/> 
  </React.StrictMode>,
  document.getElementById('root')
);
