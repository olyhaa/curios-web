import { atom } from 'recoil';

export const CurrentPlayerInfoAtom = atom({
  key: 'CurrentPlayerInfoAtom',
  default: undefined,
});

export const ComputerPlayerInfoAtom = atom({
  key: 'ComputerPlayerInfoAtom',
  default: undefined,
});

export const LocaleAtom = atom({
  key: 'LocaleAtom',
  default: [],
});

export const DrawPileAtom = atom({
  key: 'DrawPileAtom',
  default: [],
});

export const PublicCardsAtom = atom({
  key: 'PublicCardsAtom',
  default: [],
});

export const PlayerTurnAtom = atom({
  key: 'PlayerTurnAtom',
  default: true,
});

export const PlayerFirstAtom = atom({
  key: 'PlayerFirstAtom',
  default: true,
});

export const ComputerDoneRoundAtom = atom({
  key: 'ComputerDoneRoundAtom',
  default: false,
});

export const PlayerDoneRoundAtom = atom({
  key: 'PlayerDoneRoundAtom',
  default: false,
});

export const GameFinishedAtom = atom({
  key: 'GameFinishedAtom',
  default: false,
});

export const RevealScoreAtom = atom({
  key: 'RevealScoreAtom',
  default: false,
});
