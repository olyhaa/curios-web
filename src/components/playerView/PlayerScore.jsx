import React from 'react';
import PropTypes from 'prop-types';
import { PAWN_COLOR_OPTIONS } from '../../utils/constants';
import './playerScore.css';

const PlayerScore = ({ color, score }) => {
  return <div className={`player-score-${color}`}>{score}</div>;
};
PlayerScore.propTypes = {
  color: PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS)),
  score: PropTypes.number,
};

export default PlayerScore;
