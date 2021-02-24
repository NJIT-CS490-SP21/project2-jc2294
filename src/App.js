import logo from './logo.svg';
import './App.css';
//import { ListItem } from './ListItem.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Board } from './Board.js';

const socket = io(); // Connects to socket connection

function App() {
 
  return (
    <div>
      <Board/>
    </div>
  );
}

export default App;