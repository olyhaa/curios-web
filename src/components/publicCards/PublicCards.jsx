import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import Card from '../card/Card';
import { CARD_COLOR_OPTIONS } from '../../utils/constants';
import './publicCards.css';

const PublicCards = ({ cardPile, displayCards }) => {
  return (
    <div className="public-cards">
      {cardPile.length > 0 && <Card />}
      {map(
        ({ color, number }) => (
          <Card key={`${color}-${number}`} color={color} number={number} />
        ),
        displayCards
      )}
    </div>
  );
};

PublicCards.propTypes = {
  cardPile: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      numer: PropTypes.number,
    })
  ),
  displayCards: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      numer: PropTypes.number,
    })
  ),
};
export default PublicCards;
