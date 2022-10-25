import React from 'react';
import PropTypes from 'prop-types';
import { PAWN_COLOR_OPTIONS } from '../../utils/constants';
import './playerActive.css';

const PlayerActive = ({ color }) => {
  return <div className={`active-player-${color}`} />;
};
PlayerActive.propTypes = {
  color: PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS)),
};

export default PlayerActive;
