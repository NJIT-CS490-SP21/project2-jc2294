import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './Login.css';

export default function Login({ loginOnClick }) {
  const user = useRef(null);

  // button has a on click even listeer that once cleacked,
  // login function is claased and user's input is pass as parameter
  return (
    <div className="login">
      <h1 className="login-h1">Tic Tac Toe</h1>
      <p>Enter your username: </p>
      <input ref={user} type="text" />
      <button type="submit" className="login-button" onClick={() => loginOnClick(user.current.value)}>Login</button>
    </div>
  );
}

Login.propTypes = {
  loginOnClick: PropTypes.func.isRequired,
};
