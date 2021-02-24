import React from 'react';
import './Board.css';

export function Box({ onClickHandler, item }){
    return <div class="box" onClick = { (event) => onClickHandler(event) }>{item}</div>
}