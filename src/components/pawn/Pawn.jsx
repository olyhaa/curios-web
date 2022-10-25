import React from 'react';
import PropTypes from 'prop-types';
import { PAWN_COLOR_OPTIONS } from '../../utils/constants';
import './pawn.css';

const Pawn = ({ color }) => {
  return <div className={`pawn-shape-${color}`} />;
};

Pawn.propTypes = {
  color: PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS)),
};
export default Pawn;
