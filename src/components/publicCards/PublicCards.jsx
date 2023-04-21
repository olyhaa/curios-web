import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import Card from '../card/Card';
import { CARD_COLOR_OPTIONS } from '../../utils/constants';
import './publicCards.css';
import { useRecoilValue } from 'recoil';
import { DrawPileAtom, PublicCardsAtom } from '../../state/gameStateAtoms';

const PublicCards = () => {
  const cardPile = useRecoilValue(DrawPileAtom);
  const displayCards = useRecoilValue(PublicCardsAtom);

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
