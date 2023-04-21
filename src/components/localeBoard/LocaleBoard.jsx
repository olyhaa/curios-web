import React from 'react';
import { map } from 'ramda';
import PropTypes from 'prop-types';
import Locale from '../locale/Locale';
import Gem from '../gem/Gem';
import Card from '../card/Card';
import { CARD_COLOR_OPTIONS, PAWN_COLOR_OPTIONS } from '../../utils/constants';
import './localeBoard.css';
import { RevealScoreAtom } from '../../state/gameStateAtoms';
import { useRecoilValue } from 'recoil';

const LocaleBoard = ({
  slotsOccupied,
  color,
  gemCount,
  handleSelectLocale,
  card,
}) => {
  const showCard = useRecoilValue(RevealScoreAtom);

  return (
    <div>
      <div className="locale-board-area">
        {!showCard && (
          <Locale
            slotsOccupied={slotsOccupied}
            color={color}
            handleSelectLocale={handleSelectLocale}
            card={card}
          ></Locale>
        )}
        {showCard && <Card number={card.number} color={card.color} />}
      </div>
      {!showCard && gemCount > 0 && (
        <div className="gem-stash">
          {map(
            (index) => (
              <Gem key={index} color={color} />
            ),
            [...Array(gemCount).keys()]
          )}
        </div>
      )}
    </div>
  );
};

LocaleBoard.defaultProps = {
  slotsOccupied: [],
};

LocaleBoard.propTypes = {
  slotsOccupied: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS))
  ),
  color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
  gemCount: PropTypes.number,
  handleSelectLocale: PropTypes.func,
};
export default LocaleBoard;
