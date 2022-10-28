import React from 'react';
import PropTypes from 'prop-types';
import { CARD_COLOR_OPTIONS, PAWN_COLOR_OPTIONS } from '../../utils/constants';
import PlayerHand from './PlayerHand';
import PlayerGems from './PlayerGems';
import PlayerPawns from './PlayerPawns';
import PlayerActive from './PlayerActive';
import PlayerScore from './PlayerScore';
import './playerView.css';

const PlayerView = ({
  isActive,
  color,
  gems,
  cards,
  pawnCount,
  showCards,
  showPassButton,
  handlePlayerPass,
  showScore,
  score,
}) => {
  return (
    <div className="player-area">
      <div className="player-active-area">
        {!showScore && isActive && <PlayerActive color={color} />}
        {showScore && <PlayerScore score={score} color={color} />}
      </div>
      <PlayerHand cards={cards} showCards={showCards} />
      <div className="item-area">
        <PlayerPawns color={color} count={pawnCount} />
        <PlayerGems gems={gems} />
      </div>
      {showPassButton && <button onClick={handlePlayerPass}>Pass</button>}
    </div>
  );
};

PlayerView.propTypes = {
  isActive: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS)),
  gems: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      count: PropTypes.number,
    })
  ),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      numer: PropTypes.number,
    })
  ),
  pawnCount: PropTypes.number,
  showCards: PropTypes.bool,
  showPassButton: PropTypes.bool,
};
export default PlayerView;
