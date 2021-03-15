import React from 'react';
import PropTypes from 'prop-types';

export default function ListItem({ name }) {
  return <li>{name}</li>;
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};
