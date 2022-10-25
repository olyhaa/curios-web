import { ALL_CARDS } from './constants';

export const shuffleCards = (cards) => {
  const shuffledCards = [...cards];
  let currentIndex = cards.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledCards[currentIndex], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[currentIndex],
    ];
  }

  return shuffledCards;
};

export const dealCards = () => {
  const localeCards = [];
  const allCards = [...ALL_CARDS];
  localeCards.unshift(
    allCards.splice(Math.floor(Math.random() * 4 + 12), 1)[0]
  );
  localeCards.unshift(allCards.splice(Math.floor(Math.random() * 4 + 8), 1)[0]);
  localeCards.unshift(allCards.splice(Math.floor(Math.random() * 4 + 4), 1)[0]);
  localeCards.unshift(allCards.splice(Math.floor(Math.random() * 4), 1)[0]);

  const shuffledCards = shuffleCards(allCards);

  const playerCards = shuffledCards.splice(0, 4);
  const computerCards = shuffledCards.splice(0, 4);

  return { drawPile: shuffledCards, playerCards, computerCards, localeCards };
};

export const removeCard = (playerInfo, card) => {
  const { cards, maxPawnCount } = playerInfo;
  const newCards = cards.filter(({ color, number }) => {
    return !(color === card.color && number === card.number);
  });

  return {
    ...playerInfo,
    maxPawnCount: maxPawnCount + 1,
    cards: newCards,
  };
};

export const getComputerRevealedCard = (playerInfo) => {
  const { cards } = playerInfo;
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  return randomCard;
};

export const revealDrawPile = ({ drawPile, publicCards }) => {
  const newCard = drawPile.slice(0, 1)[0];
  const updatedDrawPile = drawPile.slice(1);
  const updatedPublicCards = [...publicCards, newCard];

  return { updatedDrawPile, updatedPublicCards };
};
