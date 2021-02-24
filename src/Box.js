import React from 'react';
import './Board.css';

export function CreateBoard({ onClickHandler }){
    return <div class="box" onClick = { (event) => onClickHandler(event) }></div>
}