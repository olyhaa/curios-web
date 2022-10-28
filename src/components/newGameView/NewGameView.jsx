import React from 'react';
import PropTypes from 'prop-types';

const NewGameView = ({ handleNewGame }) => {
  return <button onClick={handleNewGame}>Start Game!</button>;
};

NewGameView.propTypes = {
  handleNewGame: PropTypes.func,
};
export default NewGameView;
