import React from 'react';
import PropTypes from 'prop-types';
import { CARD_COLOR_OPTIONS } from '../../utils/constants';
import './gem.css';

const Gem = ({ color }) => {
  return <div className={`gem-shape-${color}`} />;
};

Gem.propTypes = {
  color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
};
export default Gem;
