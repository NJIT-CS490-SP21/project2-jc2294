import React from 'react';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

export function Leaderboard({currentUser}){
    
    let [leaderboard, setLeaderboard] = useState({})                    //leaderboard
    const [isShown, setShown] = useState(false)

    
    function onShowHide() {
        setShown((prevIsShown) => {
            return !prevIsShown;
        });
    }
    
    
    // The function inside useEffect is only run whenever any variable in the array
    // (passed as the second arg to useEffect) changes. Since this array is empty
    // here, then the function will only run once at the very beginning of mounting.
    useEffect(() => {
        // Listening for a click event emitted by the server. If received, we
        // run the code in the function that is passed in as the second arg
        socket.on('leaderboard', (data) => {
            console.log('leaderboard update event received!');
            console.log(data);
            setLeaderboard(data)
        });
        
        socket.on('updateScore', (data) => {
            console.log('leaderboard score update event received!');
            console.log(data);
            setLeaderboard(data)
        });

    
  }, []);
  

    return(
        <div>
            <div>
                <button onClick={() => { onShowHide(); } } > Show LeaderBoard </button>
            </div> 
            {isShown === true ? ( 
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">LeaderBoard</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Object.keys(leaderboard).map(keys => <tr><td> {keys} </td> <td>  {leaderboard[keys]} </td> </tr>) }
                        </tbody>
                    </table>
                </div>
            ) : null
                
            }
   
        </div>
        
        );
}