import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import LocaleBoard from '../localeBoard/LocaleBoard';
import PlayerView from '../playerView/PlayerView';
import PublicCards from '../publicCards/PublicCards';
import {  LOG_SOURCES } from '../../utils/constants';
import './gameBoard.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ComputerDoneRoundAtom,
  ComputerPlayerInfoAtom,
  CurrentPlayerInfoAtom,
  LocaleAtom,
  PlayerDoneRoundAtom,
  PlayerTurnAtom,
  RevealScoreAtom
} from '../../state/gameStateAtoms';
import {  computerClaimArtifact } from '../../utils/gemActions';
import { useLog } from '../../utils/useLog';

const GameBoard = ({
  handleSelectLocale
}) => {
  const locales = useRecoilValue(LocaleAtom);
  const currentPlayerInfo = useRecoilValue(CurrentPlayerInfoAtom);
  const computerPlayerInfo = useRecoilValue(ComputerPlayerInfoAtom);
  const [isPlayerTurn, setIsPlayerTurn] = useRecoilState(PlayerTurnAtom);
  const showScore = useRecoilValue(RevealScoreAtom);
  const [isPlayerDoneRound, setPlayerDoneRound] = useRecoilState(PlayerDoneRoundAtom);
  const [isComputerDoneRound, setComputerDoneRound] = useRecoilState(ComputerDoneRoundAtom);
  const updateLog = useLog();
  
  useEffect(() => {
    if (!isPlayerTurn || isPlayerDoneRound) {
      doComputerTurn();
    }
  }, [isPlayerTurn, isPlayerDoneRound]);
  
  const doComputerTurn = () => {
    setIsPlayerTurn(false);
    if (isComputerDoneRound) {
      updateLog("It's the player's turn again");
      setIsPlayerTurn(true);
    }
    const randomColor = computerClaimArtifact(
      computerPlayerInfo.pawnCount,
      locales
    );
    if (!randomColor) {
      updateLog('Computer passed for this phase.', LOG_SOURCES.COMPUTER);
      setComputerDoneRound(true);
      setIsPlayerTurn(true);
      return;
    }
    setComputerDoneRound(false);
    setTimeout(() => {
      handleSelectLocale(false, randomColor);
      updateLog("It's the player's turn");
      setIsPlayerTurn(true);
    }, 1000);
  };

  const handlePlayerPass = () => {
    updateLog('Player passed for this phase.', LOG_SOURCES.PLAYER);
    setPlayerDoneRound(true);
  };

  
  return (
    <>
      <PlayerView
        {...computerPlayerInfo}
        isActive={!isPlayerTurn}
        showCards={showScore}
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
            />
          ),
          locales
        )}
      </div>
      <PublicCards/>
      <PlayerView
        {...currentPlayerInfo}
        isActive={isPlayerTurn}
        showCards
        handlePlayerPass={handlePlayerPass}
        showPassButton={isPlayerTurn && !showScore}
      />
    </>
  );
};

GameBoard.propTypes = {
  handleSelectLocale: PropTypes.func
};

export default GameBoard;
