import React from 'react';
import PropTypes from 'prop-types';
import { CARD_COLOR_OPTIONS, DEFAULT_COLOR } from '../../utils/constants';
import './Card.css';

const Card = ({ number, color }) => {
  return (
    <div className={`number-card-${color}`}>
      <div className="number-card-number">{number}</div>
    </div>
  );
};

Card.defaultProps = {
  number: '?',
  color: DEFAULT_COLOR,
};

Card.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
};
export default Card;
