import React, { useState, useEffect } from 'react';
import './Board.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Box from './Box';
import ListItem from './ListItem';

const socket = io(); // Connects to socket connection

export default function Board({ currentUser }) {
  const [board, setBoard] = useState(Array(9).fill(null)); // fill the box with 9 null elemes
  const [isXNext, setIsXNext] = useState(1); // set state for x to start; 1: X; 0:O
  const [user, setUser] = useState({ X: '', O: '', spectators: [] }); // all the users
  const [message, setMessage] = useState('X will make the first move');

  function calculateWinner(boardTic) {
    const lines = [
      // all possible wns
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (boardTic[a] && boardTic[a] === boardTic[b] && boardTic[a] === boardTic[c]) {
        return boardTic[a];
      }
    }

    if (!boardTic.includes(null)) {
      return 'draw';
    }

    return null;
  }

  // on click handler for when a user clicks on a box
  function onClickHandler(n) {
    const copyBoard = [...board];
    if (!copyBoard[n] && !calculateWinner(board)) {
      if (!calculateWinner(board)) {
        if (currentUser === user.X) {
          if (isXNext === 1) {
            copyBoard[n] = 'X';
            setIsXNext(0);
            setMessage("O's turn to make move");
            setBoard(copyBoard);
            socket.emit('click', { copyBoard, setIsXNext: isXNext });
          } else {
            setMessage('Please wait for your turn!');
          }
        } else if (currentUser === user.O) {
          if (isXNext === 0) {
            copyBoard[n] = 'O';
            setIsXNext(1);
            setMessage("X's turn to make move");
            setBoard(copyBoard);
            socket.emit('click', { copyBoard, setIsXNext: isXNext });
          } else {
            setMessage('Please wait for your turn!');
          }
        } else {
          setMessage('Game is in progress');
        }
      }

      const winner = calculateWinner(copyBoard);
      let winnerUser;
      let loserUser;
      if (winner) {
        winnerUser = user[winner];
        if (winner === 'X') {
          loserUser = user.O;
        } else {
          loserUser = user.X;
        }
        socket.emit('updateScore', { winner: winnerUser, loser: loserUser });
      }
    }
  }

  const winner = calculateWinner(board);

  let status;
  if (winner) {
    if (winner === 'draw') {
      status = 'Its a draw';
    } else {
      status = `Winner: ${user[winner]}`;
    }
  } else if (!winner && winner === 'draw') {
    status = "It's a Draw";
  }

  const onReset = () => {
    if (currentUser === user.X || currentUser === user.O) {
      const copyBoard = [...board];
      copyBoard.fill(null);
      setBoard(copyBoard);

      if (isXNext === 0) {
        setIsXNext(1);
        setMessage("X's turn to make move");
      } else {
        setIsXNext(0);
        setMessage("O's turn to make move");
      }
      socket.emit('reset', { copyBoard, setIsXNext: isXNext });
    }
  };

  // The function inside useEffect is only run whenever any variable in the array
  // (passed as the second arg to useEffect) changes. Since this array is empty
  // here, then the function will only run once at the very beginning of mounting.
  useEffect(() => {
    // Listening for a log in click event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('login', (data) => {
      if (data.X) {
        setUser((prevUser) => ({
          ...prevUser,
          X: data.X,
        }));
      }

      if (data.O) {
        setUser((prevUser) => ({
          ...prevUser,
          O: data.O,
        }));
      }

      setUser((prevUser) => ({
        ...prevUser,
        spectators: data.spectators,
      }));
    });

    // Listening for a click event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('click', (data) => {
      // If the server sclick (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      setBoard([...data.copyBoard]);
      if (data.setIsXNext === 0) {
        setIsXNext(1);
        setMessage("X's turn to make move");
      } else {
        setIsXNext(0);
        setMessage("O's turn to make move");
      }
    });

    socket.on('reset', (data) => {
      // If the server sclick (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.

      setBoard([...data.copyBoard]);

      if (data.setIsXNext === 0) {
        setIsXNext(1);
        setMessage("X's turn to make move");
      } else {
        setIsXNext(0);
        setMessage("O's turn to make move");
      }
    });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="players">
          <div className="player">
            <p>
              Player 1:
              <span className="name">{user.X}</span>
            </p>
            <h1 className="symbol">X</h1>
          </div>
          <div className="player">
            <p>
              Player 2:
              <span className="name">{user.O}</span>
            </p>
            <h1 className="symbol">O</h1>
          </div>
          <div className="player">
            <h3>Spectators: </h3>
            <ul>
              {user.spectators.map((item) => (
                <ListItem name={item} />
              ))}
            </ul>
          </div>
        </div>
        <div className="boardAndReset">
          <p>
            <h3 className="message">{message}</h3>
          </p>
          <div className="board-css">
            {board.map((item, jindex) => (
              <Box onClickHandler={() => onClickHandler(jindex)} item={item} />
            ))}
          </div>
          <button type="submit" className="reset-button" onClick={onReset}>
            Reset
          </button>
          <p>
            <h3 className="message">{status}</h3>
          </p>
        </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  currentUser: PropTypes.string.isRequired,
};
