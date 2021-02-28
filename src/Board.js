import React from 'react';
import './Board.css';
import { Box } from './Box';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { ListItem } from './ListItem.js';


const socket = io(); // Connects to socket connection

export function Board({currentUser}){

    const [board, setBoard] = useState(Array(9).fill(null));    //fill the box with null
    const [state1, setState1] = useState(1);                    //set state for x to start; 1: X; 0:O
    
    //all the users
    let [user, setUser] = useState({ "X": "", "O": "", "spectators": []})
    
    //on click handler for when a user clicks on a box
    function onClickHandler(n){
        let copyBoard;
        copyBoard = [...board];
        if(!copyBoard[n]){
            if (currentUser === user["X"]){
                if(state1 === 1){
                    copyBoard[n] = "X";
                    setState1(0);
                    setBoard(copyBoard);
                    socket.emit('click', {copyBoard: copyBoard, setState1:state1});
                }
                else{
                    console.log("Please wait for your turn!");
                }
                
            }
            else if (currentUser === user["O"]){
                if(state1 === 0){
                    copyBoard[n] = "O";
                    setState1(1);
                    setBoard(copyBoard);
                    socket.emit('click', {copyBoard: copyBoard, setState1:state1});
                }
                else{
                    console.log("Please wait for your turn!");
                }
            }

            else{
                console.log("Game is in progress");
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
        return null;
    }
    
    const winner = calculateWinner(board);
    
    let status;
    if (winner) {
        status = "Winner: " + winner;
    }
    
    
    const onReset=()=>
    {
        let copyBoard;
        copyBoard = [...board];
        copyBoard.fill(null);
        setBoard(copyBoard);
        
        if(state1 === 0){
            setState1(1);
        }
        else{
            setState1(0);
        }
        socket.emit('reset', { copyBoard: copyBoard,setState1:state1});
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
            if(data.setState1 === 0){
                setState1(1);
            }
            else {
                setState1(0);
            }
        });
        
        socket.on('reset', (data) => {
            console.log('Rest event received!');
            console.log(data);
            // If the server sclick (on behalf of another client), then we
            // add it to the list of messages to render it on the UI.
           
            setBoard([...data.copyBoard]);
            
            if(data.setState1 === 0){
                setState1(1);
            }
            else {
                setState1(0);
            } 
        });
    
  }, []);
  

    return(
        <div>
            <h3>Player X: { user["X"] }</h3>
            <h3>Player Y: { user["O"] }</h3>
            <h3>Spectators: { user["spectators"] }</h3>
            <p>{status}</p>
             <ul>
                { user["spectators"].map(item => <ListItem name={item} />) }
            </ul>
            <button onClick={onReset}>Reset</button>
            <div class="board">
                { board.map((item, jindex)=> <Box onClickHandler = {()=> onClickHandler(jindex) } item={item}/>) }
            </div>
        </div>
        
        );
}