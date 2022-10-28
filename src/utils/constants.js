const RED = 'red';
const BLUE = 'blue';
const YELLOW = 'yellow';
const GREEN = 'green';

const BLACK = 'black';
const WHITE = 'white';
const PURPLE = 'purple';

export const DEFAULT_COLOR = 'default';
export const CARD_COLOR_OPTIONS = { RED, BLUE, YELLOW, GREEN, DEFAULT_COLOR };
export const PAWN_COLOR_OPTIONS = { BLACK, WHITE, PURPLE };

const PLAYER = 'player';
const COMPUTER = 'computer';
const GAME = 'game';

export const LOG_SOURCES = {
  PLAYER,
  COMPUTER,
  GAME,
};

export const GAME_CONFIG = [
  {
    numPlayers: 2,
    numArtifacts: 8,
    numCardsInHand: 4,
    numCardsInSideDeck: 4,
  },
  {
    numPlayers: 3,
    numArtifacts: 10,
    numCardsInHand: 4,
    numCardsInSideDeck: 0,
  },
  {
    numPlayers: 4,
    numArtifacts: 12,
    numCardsInHand: 3,
    numCardsInSideDeck: 0,
  },
  {
    numPlayers: 5,
    numArtifacts: 14,
    numCardsInHand: 2,
    numCardsInSideDeck: 3,
  },
];

export const getDefaultLocales = (numPlayers, selectLocale, localeCards) => {
  const thisGameConfig = GAME_CONFIG.filter(
    ({ numPlayers: players }) => numPlayers === players
  )[0];

  return [
    {
      slotsOccupied: [],
      color: CARD_COLOR_OPTIONS.BLUE,
      gemCount: thisGameConfig.numArtifacts,
      handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.BLUE),
      card: localeCards[0],
    },
    {
      slotsOccupied: [],
      color: CARD_COLOR_OPTIONS.GREEN,
      gemCount: thisGameConfig.numArtifacts,
      handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.GREEN),
      card: localeCards[1],
    },
    {
      slotsOccupied: [],
      color: CARD_COLOR_OPTIONS.RED,
      gemCount: thisGameConfig.numArtifacts,
      handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.RED),
      card: localeCards[2],
    },
    {
      slotsOccupied: [],
      color: CARD_COLOR_OPTIONS.YELLOW,
      gemCount: thisGameConfig.numArtifacts,
      handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.YELLOW),
      card: localeCards[3],
    },
  ];
};

export const getDefaultPlayerInfo = (cards, color) => {
  return {
    color,
    cards,
    gems: [
      { color: CARD_COLOR_OPTIONS.BLUE, count: 0 },
      { color: CARD_COLOR_OPTIONS.GREEN, count: 0 },
      { color: CARD_COLOR_OPTIONS.RED, count: 0 },
      { color: CARD_COLOR_OPTIONS.YELLOW, count: 0 },
    ],
    pawnCount: 5,
    maxPawnCount: 5,
    score: 0,
  };
};
export const ALL_CARDS = [
  { color: CARD_COLOR_OPTIONS.BLUE, number: 1 },
  { color: CARD_COLOR_OPTIONS.BLUE, number: 3 },
  { color: CARD_COLOR_OPTIONS.BLUE, number: 5 },
  { color: CARD_COLOR_OPTIONS.BLUE, number: 7 },

  { color: CARD_COLOR_OPTIONS.GREEN, number: 1 },
  { color: CARD_COLOR_OPTIONS.GREEN, number: 3 },
  { color: CARD_COLOR_OPTIONS.GREEN, number: 5 },
  { color: CARD_COLOR_OPTIONS.GREEN, number: 7 },

  { color: CARD_COLOR_OPTIONS.RED, number: 1 },
  { color: CARD_COLOR_OPTIONS.RED, number: 3 },
  { color: CARD_COLOR_OPTIONS.RED, number: 5 },
  { color: CARD_COLOR_OPTIONS.RED, number: 7 },

  { color: CARD_COLOR_OPTIONS.YELLOW, number: 1 },
  { color: CARD_COLOR_OPTIONS.YELLOW, number: 3 },
  { color: CARD_COLOR_OPTIONS.YELLOW, number: 5 },
  { color: CARD_COLOR_OPTIONS.YELLOW, number: 7 },
];
