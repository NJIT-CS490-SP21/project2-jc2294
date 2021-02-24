import React from 'react';
import './Board.css';
import { useState, useRef} from 'react';
import { CreateBoard } from './Box';

export function Board(props){
    
    const [board, setBoard] = useState(Array(9).fill(null));
    const [state1, setState1] = useState(1);
    
    function onClickHandler(n){
        let go;
        if(!n.target.innerHTML){
            if(state1 === 1){
                go = n.target.innerHTML = "X";
                setState1(0);
            }
            else{
                go = n.target.innerHTML = "O";
                setState1(1);
            }
        }
        setBoard(prevList =>[...prevList, go])
        
    }    

    
    return(
        <div class="board">
            { board.map(i => <CreateBoard onClickHandler = { onClickHandler }/>) }
        </div>
        
        );
}