import React from 'react';
import PropTypes from 'prop-types';
import './newGameView.css';

const NewGameView = ({ handleNewGame }) => {
  return (
    <div className="new-game-container">
      <h1 className="title">Curios</h1>
      <span className="intro">
        Whether you're in it for wealth or for fame, this is where your quest begins! Rogue archaeology means getting to the
        bottom of shipwrecks, ancient ruins, forgotten tombs, and forbidden temples to look for the artifacts which will bring
        you the most fortune and glory. So grab your hat and leather coat - it's time to raid some tombs!
      </span>
      <button className="new-game" onClick={handleNewGame}>Start Game!</button>
    </div>
  );
};

NewGameView.propTypes = {
  handleNewGame: PropTypes.func,
};
export default NewGameView;
