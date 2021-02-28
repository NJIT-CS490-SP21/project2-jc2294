import logo from './logo.svg';
import './App.css';
import { ListItem } from './ListItem.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Board } from './Board.js';
import { Login } from './Login.js';



const socket = io(); // Connects to socket connection

function App() {
  //user longs in

  const [usernames, setUsername] = useState(""); // State variable to store usernames
  const [loggedIn, setLoggedIn] = useState(false);  //initialize logged in status to fasle
  
  let userInput;
  const loginOnClick = (userInput)=> {
    if(userInput != null){
      console.log(userInput)
      
      //setUsername(prevUsernames => [...prevUsernames, usernames]);

      setUsername(userInput);
      
      //setLoggedIn(!loggedIn)  //set loogded in to opposite
      setLoggedIn((prevLog) => {
        return !prevLog;
      });
      
      socket.emit('login',{username:userInput});
    };
  }
  
  useEffect(() => {
    // Listening for a click event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('login', (login) => {
      console.log('A player logging in!');
      console.log(login);
      // If the server sclick (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      
      setUsername(prevUsernames => [...prevUsernames, usernames])
      //setUsernamesList([...login.setUsername]); this
    });
  }, []);

  //if user has logging is, user is able to see the borard 
  if(loggedIn && usernames != ""){
    return (
      <div>
        <h3>Player X:</h3>
        <h3>Player O:</h3>
        <ul>
        </ul>
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