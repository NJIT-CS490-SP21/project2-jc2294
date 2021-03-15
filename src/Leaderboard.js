import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import io from 'socket.io-client';
import './Leaderboard.css';

const socket = io(); // Connects to socket connection

export default function Leaderboard({ currentUser }) {
  const [leaderboard, setLeaderboard] = useState([]); // leaderboard
  const [isShown, setShown] = useState(false);

  function onShowHide() {
    setShown((prevIsShown) => !prevIsShown);
  }

  // The function inside useEffect is only run whenever any variable in the array
  // (passed as the second arg to useEffect) changes. Since this array is empty
  // here, then the function will only run once at the very beginning of mounting.
  useEffect(() => {
    // Listening for a click event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('leaderboard', (data) => {
      setLeaderboard(data);
    });

    socket.on('updateScore', (data) => {
      setLeaderboard(data);
    });
  }, []);

  return (
    <div id="leaderboard" className="leaderboard">
      <div>
        <button
          type="submit"
          className="leaderboard-btn"
          onClick={() => {
            onShowHide();
          }}
        >
          {' '}
          Show LeaderBoard
          {' '}
        </button>
      </div>
      {isShown === true ? (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th colSpan="2">LeaderBoard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Player</th>
                <th>Score</th>
              </tr>
              {leaderboard.map((item) => Object.keys(item).map((keys) => (currentUser === keys ? (
                <tr className="highlight">
                  <td>
                    {' '}
                    {keys}
                    {' '}
                  </td>
                  {' '}
                  <td>
                    {' '}
                    {item[keys]}
                    {' '}
                  </td>
                  {' '}
                </tr>
              ) : (
                <tr>
                  <td>
                    {' '}
                    {keys}
                    {' '}
                  </td>
                  {' '}
                  <td>
                    {' '}
                    {item[keys]}
                    {' '}
                  </td>
                  {' '}
                </tr>
              ))))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

Leaderboard.propTypes = {
  currentUser: PropTypes.string.isRequired,
};
