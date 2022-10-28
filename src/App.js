import './App.css';
import React, { useEffect, useState } from 'react';
import GameBoard from './components/gameBoard/GameBoard';
import GameLog from './components/gameLog/GameLog';
import ErrorBoundary from './ErrorBoundary';
import {
  PAWN_COLOR_OPTIONS,
  getDefaultLocales,
  getDefaultPlayerInfo,
  GAME_CONFIG,
  LOG_SOURCES,
} from './utils/constants';
import { dealCards } from './utils/cardActions';
import {
  computerClaimArtifact,
  claimArtifact,
  countLocalesWithGems,
} from './utils/gemActions';
import { handleEndOfRound } from './utils/roundActions';
import NewGameView from './components/newGameView/NewGameView';

function App() {
  const [locales, setLocales] = useState();
  const [drawPile, setDrawPile] = useState();
  const [publicCards, setPublicCards] = useState();
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState();
  const [computerPlayerInfo, setComputerPlayerInfo] = useState();
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isPlayerFirst, setIsPlayerFirst] = useState(true);
  const [isComputerDoneRound, setComputerDoneRound] = useState(false);
  const [isPlayerDoneRound, setPlayerDoneRound] = useState(false);
  const [isGameDone, setGameDone] = useState(false);
  const [revealScore, setRevealScore] = useState(false);
  const [gameLog, setGameLog] = useState([]);

  const handleSelectLocale = (isCurrentPlayer, color) => {
    if (isCurrentPlayer) {
      const { isError, newPlayerInfo, newLocales } = claimArtifact(
        currentPlayerInfo,
        color,
        locales
      );
      if (!isError) {
        updateLog(
          'Player claimed an artifact from ' + color,
          LOG_SOURCES.PLAYER
        );
        setCurrentPlayerInfo(() => newPlayerInfo);
        setLocales(() => newLocales);

        updateLog("It's the computer's turn");
        setIsPlayerTurn(false);
      } else {
        updateLog(
          'Player unable to claim an artifact from ' + color,
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
          'Computer claimed an artifact from ' + color,
          LOG_SOURCES.COMPUTER
        );
        setComputerPlayerInfo(() => newPlayerInfo);
        setLocales(() => newLocales);
      } else {
        updateLog(
          'Computer unable to claim an artifact from ' + color,
          LOG_SOURCES.COMPUTER
        );
      }
    }
  };

  const resetBoard = () => {
    setGameLog([]);
    const thisGameConfig = GAME_CONFIG.filter(
      ({ numPlayers }) => numPlayers === 2
    )[0];

    const { drawPile, playerCards, computerCards, localeCards } =
      dealCards(thisGameConfig);
    updateLog('Dealing out new cards');

    setLocales(() => getDefaultLocales(2, handleSelectLocale, localeCards));
    setDrawPile(() => drawPile);
    setPublicCards(() => []);
    setCurrentPlayerInfo(() =>
      getDefaultPlayerInfo(playerCards, PAWN_COLOR_OPTIONS.PURPLE)
    );
    setComputerPlayerInfo(() =>
      getDefaultPlayerInfo(computerCards, PAWN_COLOR_OPTIONS.WHITE)
    );
    updateLog("It's the player's turn");
    setIsPlayerFirst(true);
    setIsPlayerTurn(true);
    setComputerDoneRound(false);
    setPlayerDoneRound(false);
    setGameDone(false);
    setRevealScore(false);
  };

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
      updateLog('Computer Passed', LOG_SOURCES.COMPUTER);
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
    updateLog('Player Passed', LOG_SOURCES.PLAYER);
    setPlayerDoneRound(true);
  };

  const endRound = () => {
    updateLog("It's the end of the round");
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

    updateLog('Resetting pawns for all players');
    setCurrentPlayerInfo(() => updatedPlayerInfo);
    setComputerPlayerInfo(() => updatedComputerInfo);
    setLocales(() => updatedLocales);
    setDrawPile(() => updatedDrawPile);
    setPublicCards(() => updatedPublicCards);

    setComputerDoneRound(false);
    setPlayerDoneRound(false);
    updateLog(`It's the ${isPlayerFirst ? "computer's" : "player's"} turn`);
    setIsPlayerTurn(!isPlayerFirst);
    setIsPlayerFirst(!isPlayerFirst);
  };

  const updateLog = (newItem, logSource = LOG_SOURCES.GAME) => {
    setGameLog((oldArray) => [
      ...oldArray,
      { item: newItem, source: logSource },
    ]);
  };

  const endGame = () => {
    updateLog('The game is over!');
    setRevealScore(true);
    updateLog(
      `${
        currentPlayerInfo.score > computerPlayerInfo.score
          ? 'Player'
          : 'Computer'
      } wins!`
    );
  };

  useEffect(() => {
    if (countLocalesWithGems(locales) <= 2) {
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

  useEffect(() => {
    if (!isPlayerTurn || isPlayerDoneRound) {
      doComputerTurn();
    }
  }, [isPlayerTurn, isPlayerDoneRound]);

  return (
    <div className="App">
      <ErrorBoundary>
        <>
          {currentPlayerInfo && (
            <div className="game-layout">
              <div className="game-board-container">
                <GameBoard
                  locales={locales}
                  handleSelectLocale={handleSelectLocale}
                  drawPile={drawPile}
                  publicCards={publicCards}
                  currentPlayerInfo={currentPlayerInfo}
                  computerPlayerInfo={computerPlayerInfo}
                  isPlayerTurn={isPlayerTurn}
                  handlePlayerPass={handlePlayerPass}
                  addLog={updateLog}
                  showScore={revealScore}
                />
              </div>
              <div className="game-log-container">
                <GameLog log={gameLog} />
              </div>
            </div>
          )}
          {!currentPlayerInfo && <NewGameView handleNewGame={resetBoard} />}
        </>
      </ErrorBoundary>
    </div>
  );
}

export default App;
