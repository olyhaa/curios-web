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

export const getDefaultLocales = (selectLocale, localeCards) => [
  {
    slotsOccupied: [],
    color: CARD_COLOR_OPTIONS.BLUE,
    gemCount: 9,
    handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.BLUE),
    card: localeCards[0],
  },
  {
    slotsOccupied: [],
    color: CARD_COLOR_OPTIONS.GREEN,
    gemCount: 9,
    handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.GREEN),
    card: localeCards[1],
  },
  {
    slotsOccupied: [],
    color: CARD_COLOR_OPTIONS.RED,
    gemCount: 9,
    handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.RED),
    card: localeCards[2],
  },
  {
    slotsOccupied: [],
    color: CARD_COLOR_OPTIONS.YELLOW,
    gemCount: 9,
    handleSelectLocale: () => selectLocale(true, CARD_COLOR_OPTIONS.YELLOW),
    card: localeCards[3],
  },
];

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
