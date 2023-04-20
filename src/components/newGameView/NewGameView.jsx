import React from 'react';
import PropTypes from 'prop-types';
import './newGameView.css';

const NewGameView = ({ handleNewGame }) => {
  return (
    <div>
      <h1 class="title">Curios</h1>
      <button class="new-game" onClick={handleNewGame}>Start Game!</button>
    </div>
  );
};

NewGameView.propTypes = {
  handleNewGame: PropTypes.func,
};
export default NewGameView;
