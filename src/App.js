import './App.css';
import { useState} from 'react';
import io from 'socket.io-client';
import { Board } from './Board.js';
import { Login } from './Login.js';
import { Leaderboard } from './Leaderboard.js';

const socket = io(); // Connects to socket connection

function App() {

  const [usernames, setUsername] = useState(""); // State variable to store usernames
  const [loggedIn, setLoggedIn] = useState(false);  //initialize logged in status to fasle
  

  const loginOnClick = (userInput)=> {
    if(userInput != null){
    
      setUsername(userInput);
      
      setLoggedIn((prevLog) => {
        return !prevLog;
      });
      
      socket.emit('login',{username:userInput});
    };
  }
  
  //if user has logging is, user is able to see the borard and leaderboard
  if(loggedIn && usernames !== ""){
    return (
      <div class="gamePage">
        <Board currentUser={usernames}/>
        <Leaderboard currentUser={usernames}/>
      </div>
      
     );
  
  }
  //else user is prompt to loin plage where user is able to enter their username
  else{
    return(
      <div class="login">
        <Login loginOnClick={loginOnClick}/>
      </div>
      );
  }
}

export default App;