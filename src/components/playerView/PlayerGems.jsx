import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { CARD_COLOR_OPTIONS } from '../../utils/constants';
import Gem from '../gem/Gem';
import './playerGems.css';

const PlayerGems = ({ gems }) => {
  let gemCount = 0;
  return (
    <div className="player-gems">
      {map(
        ({ color, count }) =>
          map(
            () => <Gem key={`${color}-${++gemCount}`} color={color} />,
            [...Array(count).keys()]
          ),
        gems
      )}
    </div>
  );
};

PlayerGems.propTypes = {
  gems: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      count: PropTypes.number,
    })
  ),
};
export default PlayerGems;
