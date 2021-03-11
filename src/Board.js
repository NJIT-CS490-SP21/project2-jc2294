import React from 'react';
import './Board.css';
import { Box } from './Box';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { ListItem } from './ListItem.js';
import { Leaderboard } from './Leaderboard.js';
const socket = io(); // Connects to socket connection

export function Board({currentUser}){
    
    const [board, setBoard] = useState(Array(9).fill(null));    //fill the box with 9 null elemes
    const [isXNext, setIsXNext] = useState(1);                    //set state for x to start; 1: X; 0:O
    
    let [user, setUser] = useState({ "X": "", "O": "", "spectators": []})       //all the users
    const [isShown, setShown] = useState(false)
    
    const [message, setMessage] = useState("X's will make move");
  
    //on click handler for when a user clicks on a box
    function onClickHandler(n){
        let copyBoard;
        copyBoard = [...board];
        if(!copyBoard[n] && !calculateWinner(board)){
            if (!calculateWinner(board)){
                if (currentUser === user["X"]){
                    if(isXNext === 1){
                        copyBoard[n] = "X";
                        setIsXNext(0);
                        setMessage("O's turn to make move");
                        setBoard(copyBoard);
                        socket.emit('click', {copyBoard: copyBoard, setIsXNext:isXNext});
                    }
                    else{
                        setMessage("Please wait for your turn!");
                    }
                    
                }
                else if (currentUser === user["O"]){
                    if(isXNext === 0){
                        copyBoard[n] = "O";
                        setIsXNext(1);
                        setMessage("X's turn to make move");
                        setBoard(copyBoard);
                        socket.emit('click', {copyBoard: copyBoard, setIsXNext:isXNext});
                    }
                    else{
                        setMessage("Please wait for your turn!");
                    }
                }
    
                else{
                    setMessage("Game is in progress");
                }
            }
            
            const winner = calculateWinner(copyBoard);
            console.log(winner);
        
            let winnerUser;
            let loserUser;
            if (winner) {
                winnerUser = user[winner];
                if (winner === 'X'){
                    loserUser = user["O"];
                }
                else{
                    loserUser = user["X"];
                }
                
                if(winner === "draw"){
                }
                socket.emit('updateScore', { winner:winnerUser, loser:loserUser});
            }
            
        }
        
    }  
    
    function calculateWinner(board) {
        const lines = [     //all possible wns
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        
        if(!board.includes(null)){
            return "draw"
        }
        
        return null;
    }
    

    const winner = calculateWinner(board);
    
    let status;
    if (winner) {
        if(winner === "draw"){
            status = "Its a draw";

        }
        else{
            status = "Winner: " + user[winner];

        }
    }
    else{
        if(!winner && winner === "draw"){
            status = status = "It's a Draw";
        }
    }
    

    
    
    const onReset=()=>
    {
        if(currentUser === user["X"] ||  currentUser === user["O"]){
            let copyBoard;
            copyBoard = [...board];
            copyBoard.fill(null);
            setBoard(copyBoard);
            
            if(isXNext === 0){
                setIsXNext(1);
                setMessage("X's turn to make move");
            }
            else{
                setIsXNext(0);
                setMessage("O's turn to make move");
            }
            socket.emit('reset', { copyBoard: copyBoard,setIsXNext:isXNext});
        }
    }
    
    function onShowHide() {
        setShown((prevIsShown) => {
            return !prevIsShown;
        });
    }
    
    // The function inside useEffect is only run whenever any variable in the array
    // (passed as the second arg to useEffect) changes. Since this array is empty
    // here, then the function will only run once at the very beginning of mounting.
    useEffect(() => {
        // Listening for a log in click event emitted by the server. If received, we
        // run the code in the function that is passed in as the second arg
        socket.on('login', (data) => {
            console.log('Message from board.js A player has entered in the game');
            console.log(data);
            if(data['X']){
                setUser((prevUser) => ({...prevUser,
                    ['X']: data['X']
                }));
            }
            
            if(data['O']){
                setUser((prevUser) => ({...prevUser,
                    ['O']: data['O']
                }));
            }
            
            setUser((prevUser) => ({...prevUser,
                    ['spectators']: data['spectators']
                }));
        });
        
        
        // Listening for a click event emitted by the server. If received, we
        // run the code in the function that is passed in as the second arg
        socket.on('click', (data) => {
            console.log('Click event received!');
            console.log(data);
            // If the server sclick (on behalf of another client), then we
            // add it to the list of messages to render it on the UI.
            setBoard([...data.copyBoard]);
            if(data.setIsXNext === 0){
                setIsXNext(1);
                setMessage("X's turn to make move");

            }
            else {
                setIsXNext(0);
                setMessage("O's turn to make move");

            }
            
        });
        
        socket.on('reset', (data) => {
            console.log('Rest event received!');
            console.log(data);
            // If the server sclick (on behalf of another client), then we
            // add it to the list of messages to render it on the UI.
           
            setBoard([...data.copyBoard]);
            
            if(data.setIsXNext === 0){
                setIsXNext(1);
                setMessage("X's turn to make move");
            }
            else {
                setIsXNext(0);
                setMessage("O's turn to make move");
            } 
        });        

    
  }, []);
  
    return(
        <div>
            <div class="container">
                <div class="players">
                    <div class="player">
                        <p>Player 1: <span class="name">{ user["X"] }</span></p>
                        <h1 class="symbol">X</h1>
                    </div>
                    <div class="player">
                        <p>Player 2: <span class="name">{ user["O"] }</span></p>
                        <h1 class="symbol">O</h1>
                    </div>
                    <div class="player">
                    <h3>Spectators: </h3>
                     <ul>
                        { user["spectators"].map(item => <ListItem name={item} />) }
                    </ul>
                </div>
                </div>
                <div class="boardAndReset">
                    <p><h3 class="message">{ message }</h3></p>
                    <div class="board">
                        { board.map((item, jindex)=> <Box onClickHandler = {()=> onClickHandler(jindex) } item={item}/>) }
                    </div>
                    <button class="reset-button" onClick={onReset}>Reset</button>
                    <p><h3 class="message">{ status }</h3></p>
                </div>
            </div>
        </div>
        
        );
}