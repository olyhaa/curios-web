import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import LocaleBoard from '../localeBoard/LocaleBoard';
import PlayerView from '../playerView/PlayerView';
import PublicCards from '../publicCards/PublicCards';
import { CARD_COLOR_OPTIONS, PAWN_COLOR_OPTIONS } from '../../utils/constants';
import './gameBoard.css';

const GameBoard = ({
  locales,
  handleSelectLocale,
  drawPile,
  publicCards,
  currentPlayerInfo,
  computerPlayerInfo,
  isPlayerTurn,
  handlePlayerPass,
  showScore,
}) => {
  return (
    <>
      <PlayerView
        {...computerPlayerInfo}
        isActive={!isPlayerTurn}
        showScore={showScore}
      />
      <div className="locale-area">
        {map(
          ({ color, slotsOccupied, gemCount, card }) => (
            <LocaleBoard
              key={color}
              slotsOccupied={slotsOccupied}
              color={color}
              gemCount={gemCount}
              handleSelectLocale={handleSelectLocale}
              card={card}
              showCard={showScore}
              isPlayerTurn={isPlayerTurn}
            />
          ),
          locales
        )}
      </div>
      <PublicCards cardPile={drawPile} displayCards={publicCards} />
      <PlayerView
        {...currentPlayerInfo}
        isActive={isPlayerTurn}
        showCards
        handlePlayerPass={handlePlayerPass}
        showScore={showScore}
      />
    </>
  );
};

GameBoard.propTypes = {
  locales: PropTypes.arrayOf(
    PropTypes.shape({
      slotsOccupied: PropTypes.arrayOf(
        PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS))
      ),
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      gemCount: PropTypes.number,
    })
  ),
  handleSelectLocale: PropTypes.func,
  drawPile: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      numer: PropTypes.number,
    })
  ),
  publicCards: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
      numer: PropTypes.number,
    })
  ),
  isPlayerTurn: PropTypes.bool,
  currentPlayerInfo: PropTypes.shape({
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
  }),
  handlePlayerPass: PropTypes.func,
  addLog: PropTypes.func,
};

export default GameBoard;
