import React from 'react';
import './Board.css';
import { Box } from './Box';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

export function Board(props){
    
    const [board, setBoard] = useState(Array(9).fill(null));
    const [state1, setState1] = useState(1);
    
    function onClickHandler(n){
        let go;
        go = [...board]
        if(!go[n]){
            if(state1 === 1){
                go[n] = "X";
                setState1(0);
            }
            else{
                go[n] = "O";
                setState1(1);
            }
        }
        setBoard(go);
        //setBoard(prevList =>[...prevList, go])
        socket.emit('click', {go: go, setState1:state1});
        
    }    
    
    // The function inside useEffect is only run whenever any variable in the array
    // (passed as the second arg to useEffect) changes. Since this array is empty
    // here, then the function will only run once at the very beginning of mounting.
    useEffect(() => {
        // Listening for a chat event emitted by the server. If received, we
        // run the code in the function that is passed in as the second arg
        socket.on('click', (data) => {
        console.log('Click event received!');
        console.log(data);
        // If the server sends a message (on behalf of another client), then we
        // add it to the list of messages to render it on the UI.
        setBoard([...data.go]);
        if(data.setState1 === 0){
            setState1(1);
        }
        else {
            setState1(0);
        }
    });
  }, []);

    
    return(
        <div class="board">
            { board.map((item, jindex)=> <Box onClickHandler = {()=> onClickHandler(jindex) } item={item}/>) }
        </div>
        
        );
}