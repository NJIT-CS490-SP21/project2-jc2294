import React from 'react';
import {useRef} from 'react';
import './Login.css';


export function Login({loginOnClick})
{
    let user = useRef(null);
    
    //button has a on click even listeer that once cleacked, 
    //login function is claased and user's input is pass as parameter
    return (
        <div class="login">
            <h1 class="login-h1">Tic Tac Toe</h1>
            <p>Enter your username: </p>
            <input ref = {user} type="text"/>
            <button class="login-button" onClick= { () => loginOnClick(user.current.value)}>Login</button>
        </div>
        );

}