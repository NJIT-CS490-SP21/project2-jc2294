import React from 'react';
import {useState, useRef} from 'react';

export function Login({loginOnClick})
{
    let user = useRef(null);
    
    //button has a on click even listeer that once cleacked, 
    //login function is claased and user's input is pass as parameter
    return (
        <div>
            <input ref = {user} type="text"/>
            <button onClick= { () => loginOnClick(user.current.value)}>Enter</button>
        </div>
        );

}