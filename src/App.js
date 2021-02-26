import logo from './logo.svg';
import './App.css';
//import { ListItem } from './ListItem.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Board } from './Board.js';
import { Login } from './Login.js';


const socket = io(); // Connects to socket connection

function App() {
  //user longs in
  const [usernames, setUsername] = useState([]); // State variable, list of users
  const [loggedIn, setLoggedIn] = useState(false);  //initialize logged in status to fasle
  
  let username;
  const loginOnClick = (username)=> {
    username = username;
    setUsername(username);
    setLoggedIn(!loggedIn)  //set loogded in to true
    socket.emit('login',{setUsername:username});
  }
  
  useEffect(() => {
    // Listening for a click event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('login', (login) => {
      console.log('A player logging in!');
      console.log(login);
      // If the server sclick (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      setUsername([...login.setUsername]);
    });
  }, []);

  //if user has logging is, user is able to see the borard 
  if(loggedIn && usernames != ""){
    return (
      <div>
        <Board/>
      </div>
      
     );
  
  }
  //else user is prompt to loin plage where user is able to enter their username
  else{
    return(
      <div>
        <h1>Play Tic-Tac-Toe</h1>
        <p>Enter your username: </p>
        <Login loginOnClick={loginOnClick}/>
      </div>
      );
  }
}

export default App;