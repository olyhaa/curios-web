import './App.css';
import React, { useEffect, useState } from 'react';
import GameBoard from './components/gameBoard/GameBoard';
import GameLog from './components/gameLog/GameLog';
import ErrorBoundary from './ErrorBoundary';
import {
  PAWN_COLOR_OPTIONS,
  getDefaultLocales,
  getDefaultPlayerInfo,
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
        updateLog('Player claimed an artifact from ' + color);
        setCurrentPlayerInfo(() => newPlayerInfo);
        setLocales(() => newLocales);

        updateLog("It's the computer's turn");
        setIsPlayerTurn(false);
      } else {
        updateLog('Player unable to claim an artifact from ' + color);
      }
    } else {
      const { isError, newPlayerInfo, newLocales } = claimArtifact(
        computerPlayerInfo,
        color,
        locales
      );
      if (!isError) {
        updateLog('Computer claimed an artifact from ' + color);
        setComputerPlayerInfo(() => newPlayerInfo);
        setLocales(() => newLocales);
      } else {
        updateLog('Computer unable to claim an artifact from ' + color);
      }
    }
  };

  const resetBoard = () => {
    const { drawPile, playerCards, computerCards, localeCards } = dealCards();
    updateLog('Dealing out new cards');

    setLocales(() => getDefaultLocales(handleSelectLocale, localeCards));
    setDrawPile(() => drawPile);
    setPublicCards(() => []);
    setCurrentPlayerInfo(() =>
      getDefaultPlayerInfo(playerCards, PAWN_COLOR_OPTIONS.PURPLE)
    );
    setComputerPlayerInfo(() =>
      getDefaultPlayerInfo(computerCards, PAWN_COLOR_OPTIONS.WHITE)
    );
    updateLog("It's the player's turn");
    setIsPlayerTurn(true);
    setComputerDoneRound(false);
    setPlayerDoneRound(false);
    setGameDone(false);
    setRevealScore(false);
  };

  const doComputerTurn = () => {
    const randomColor = computerClaimArtifact(
      currentPlayerInfo.pawnCount,
      locales
    );
    if (!randomColor) {
      updateLog('Computer Passed');
      setComputerDoneRound(true);
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
    updateLog('Player Passed');
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
    updateLog("It's the computer's turn");
    setIsPlayerTurn(false);
  };

  const updateLog = (newItem) => {
    setGameLog((oldArray) => [...oldArray, newItem]);
  };

  const endGame = () => {
    updateLog('The game is over!');
    setRevealScore(true);
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
