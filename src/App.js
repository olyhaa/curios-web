import React, { useEffect } from 'react';
import GameBoard from './components/gameBoard/GameBoard';
import GameLog from './components/sidebar/gameLog/GameLog';
import ErrorBoundary from './ErrorBoundary';
import {
  PAWN_COLOR_OPTIONS,
  getDefaultLocales,
  getDefaultPlayerInfo,
  GAME_CONFIG,
  LOG_SOURCES,
} from './utils/constants';
import { dealCards } from './utils/cardActions';
import { claimArtifact, countLocalesWithGems } from './utils/gemActions';
import { handleEndOfRound } from './utils/roundActions';
import NewGameView from './components/newGameView/NewGameView';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  ComputerDoneRoundAtom,
  ComputerPlayerInfoAtom,
  CurrentPlayerInfoAtom,
  DrawPileAtom,
  GameFinishedAtom,
  LocaleAtom,
  PlayerDoneRoundAtom,
  PlayerFirstAtom,
  PlayerTurnAtom,
  PublicCardsAtom,
  RevealScoreAtom,
} from './state/gameStateAtoms';
import { GameLogAtom } from './state/logAtom';
import './App.css';
import { useLog } from './utils/useLog';

function App() {
  const [locales, setLocales] = useRecoilState(LocaleAtom);
  const [drawPile, setDrawPile] = useRecoilState(DrawPileAtom);
  const [publicCards, setPublicCards] = useRecoilState(PublicCardsAtom);
  const resetPublicCards = useResetRecoilState(PublicCardsAtom);
  const [currentPlayerInfo, setCurrentPlayerInfo] = useRecoilState(
    CurrentPlayerInfoAtom
  );
  const [computerPlayerInfo, setComputerPlayerInfo] = useRecoilState(
    ComputerPlayerInfoAtom
  );
  const setIsPlayerTurn = useSetRecoilState(PlayerTurnAtom);
  const resetPlayerTurn = useResetRecoilState(PlayerTurnAtom);
  const [isPlayerFirst, setIsPlayerFirst] = useRecoilState(PlayerFirstAtom);
  const resetPlayerFirst = useResetRecoilState(PlayerFirstAtom);
  const isComputerDoneRound = useRecoilValue(ComputerDoneRoundAtom);
  const resetComputerDoneRound = useResetRecoilState(ComputerDoneRoundAtom);
  const isPlayerDoneRound = useRecoilValue(PlayerDoneRoundAtom);
  const resetPlayerDoneRound = useResetRecoilState(PlayerDoneRoundAtom);
  const [isGameDone, setGameDone] = useRecoilState(GameFinishedAtom);
  const resetGameDone = useResetRecoilState(GameFinishedAtom);
  const setRevealScore = useSetRecoilState(RevealScoreAtom);
  const resetRevealScore = useResetRecoilState(RevealScoreAtom);
  const resetGameLog = useResetRecoilState(GameLogAtom);
  const updateLog = useLog();

  const startNewGame = () => {
    updateLog('Setting up board for a new game.');
    resetGameLog();
    resetPublicCards();

    const thisGameConfig = GAME_CONFIG.filter(
      ({ numPlayers }) => numPlayers === 2
    )[0];

    const { drawPile, playerCards, computerCards, localeCards } =
      dealCards(thisGameConfig);

    setLocales(() => getDefaultLocales(2, handleSelectLocale, localeCards));
    updateLog(`Assigning ${localeCards.length} cards to Treasure Sites.`);

    setDrawPile(() => drawPile);
    updateLog(`${drawPile.length} cards added to Market side deck.`);

    setCurrentPlayerInfo(() =>
      getDefaultPlayerInfo(playerCards, PAWN_COLOR_OPTIONS.PURPLE)
    );
    updateLog(`${playerCards.length} cards dealt to player.`);

    setComputerPlayerInfo(() =>
      getDefaultPlayerInfo(computerCards, PAWN_COLOR_OPTIONS.WHITE)
    );
    updateLog(`${computerCards.length} cards dealt to computer.`);

    resetPlayerFirst();
    resetPlayerTurn();
    resetComputerDoneRound();
    resetPlayerDoneRound();
    resetGameDone();
    resetRevealScore();
    updateLog("It's the player's turn.");
  };

  const handleSelectLocale = (isCurrentPlayer, color) => {
    if (isCurrentPlayer) {
      const { isError, newPlayerInfo, newLocales } = claimArtifact(
        currentPlayerInfo,
        color,
        locales
      );
      if (!isError) {
        updateLog(
          `Player claimed an artifact from ${color}.`,
          LOG_SOURCES.PLAYER
        );
        setCurrentPlayerInfo(() => newPlayerInfo);
        setLocales(() => newLocales);

        updateLog("It's the computer's turn");
        setIsPlayerTurn(false);
      } else {
        updateLog(
          `Player unable to claim an artifact from ${color}.`,
          LOG_SOURCES.PLAYER
        );
      }
    } else {
      const { isError, newPlayerInfo, newLocales } = claimArtifact(
        computerPlayerInfo,
        color,
        locales
      );
      if (!isError) {
        updateLog(
          `Computer claimed an artifact from ${color}.`,
          LOG_SOURCES.COMPUTER
        );
        setComputerPlayerInfo(() => newPlayerInfo);
        setLocales(() => newLocales);
      } else {
        updateLog(
          `Computer unable to claim an artifact from ${color}.`,
          LOG_SOURCES.COMPUTER
        );
      }
    }
  };

  const endRound = () => {
    updateLog('Searching for Treasure is completed this round.');

    const {
      updatedComputerInfo,
      updatedPlayerInfo,
      updatedLocales,
      updatedPublicCards,
      updatedDrawPile,
    } = handleEndOfRound({
      computerPlayerInfo,
      currentPlayerInfo,
      locales,
      publicCards,
      drawPile,
    });

    updateLog('Retrieving Archaeologists for all players.');
    setCurrentPlayerInfo(() => updatedPlayerInfo);
    updateLog(`Player has ${currentPlayerInfo.maxPawnCount} archaeologists.`);

    setComputerPlayerInfo(() => updatedComputerInfo);
    updateLog(
      `Computer has ${computerPlayerInfo.maxPawnCount} archaeologists.`
    );

    setLocales(() => updatedLocales);
    setDrawPile(() => updatedDrawPile);
    setPublicCards(() => updatedPublicCards);
    updateLog(
      `There are now ${updatedDrawPile.length} cards in the Market side deck.`
    );

    resetComputerDoneRound();
    resetPlayerDoneRound();

    updateLog(`It's the ${isPlayerFirst ? "computer's" : "player's"} turn`);
    setIsPlayerTurn(!isPlayerFirst);
    setIsPlayerFirst(!isPlayerFirst);
  };

  const endGame = () => {
    updateLog('Computing scores...');
    setRevealScore(true);
    updateLog(
      `Computer has ${computerPlayerInfo.score} points.`,
      LOG_SOURCES.COMPUTER
    );
    updateLog(
      `Player has ${currentPlayerInfo.score} points.`,
      LOG_SOURCES.PLAYER
    );

    if (currentPlayerInfo.score === computerPlayerInfo.score) {
      updateLog('Player and Computer ties!');
    } else {
      updateLog(
        `${
          currentPlayerInfo.score > computerPlayerInfo.score
            ? 'Player'
            : 'Computer'
        } wins!`
      );
    }
  };

  useEffect(() => {
    const gemCount = countLocalesWithGems(locales);
    if (gemCount <= 2) {
      updateLog(
        `There are ${gemCount} remaining locales with artifacts. This will be the last round.`
      );
      setGameDone(true);
    }
  }, [locales]);

  useEffect(() => {
    if (isPlayerDoneRound && isComputerDoneRound) {
      if (isGameDone) {
        endGame();
      } else {
        endRound();
      }
    }
  }, [isPlayerDoneRound, isComputerDoneRound]);

  return (
    <div className="App">
      <ErrorBoundary>
        <>
          {currentPlayerInfo && (
            <div className="game-layout">
              <div className="game-board-container">
                <GameBoard handleSelectLocale={handleSelectLocale} />
              </div>
              <div className="game-sidebar">
                <GameLog />
              </div>
            </div>
          )}
          {!currentPlayerInfo && <NewGameView handleNewGame={startNewGame} />}
        </>
      </ErrorBoundary>
    </div>
  );
}

export default App;
