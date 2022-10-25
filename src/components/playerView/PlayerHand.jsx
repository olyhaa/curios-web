import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import Card from '../card/Card';
import { CARD_COLOR_OPTIONS } from '../../utils/constants';
import './playerHand.css';

const PlayerHand = ({ cards, showCards }) => {
  return (
    <div className="player-cards">
      {map(
        ({ color, number }) => (
          <Card
            key={`${color}-${number}`}
            color={showCards ? color : undefined}
            number={showCards ? number : '?'}
          />
        ),
        cards
      )}
    </div>
  );
};

PlayerHand.propTypes = {
  showCards: PropTypes.bool,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      number: PropTypes.number,
    })
  ),
};
export default PlayerHand;
