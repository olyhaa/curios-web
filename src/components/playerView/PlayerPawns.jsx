import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { PAWN_COLOR_OPTIONS } from '../../utils/constants';
import Pawn from '../pawn/Pawn';
import './playerPawns.css';

const PlayerPawns = ({ color, count }) => {
  return (
    <div className="player-pawns">
      {map(
        (index) => (
          <Pawn key={index} color={color} />
        ),
        [...Array(count).keys()]
      )}
    </div>
  );
};

PlayerPawns.propTypes = {
  color: PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS)),
  count: PropTypes.number,
};
export default PlayerPawns;
