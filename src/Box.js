import React from 'react';
import './Board.css';
import PropTypes from 'prop-types';

export default function Box({ onClickHandler, item }) {
  return (
    <div
      className="box"
      role="button"
      tabIndex="-1"
      onClick={(event) => onClickHandler(event)}
      onKeyDown={onClickHandler}
    >
      {item}
    </div>
  );
}

Box.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};
