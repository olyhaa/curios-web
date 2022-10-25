import {
  removeCard,
  getComputerRevealedCard,
  revealDrawPile,
} from './cardActions';
import { getBonusGems } from './gemActions';
import { resetPawns, resetPawnsOnLocales } from './pawnActions';

export const handleEndOfRound = ({
  computerPlayerInfo,
  currentPlayerInfo,
  locales,
  publicCards,
  drawPile,
}) => {
  const {
    newPlayerInfo: computerInfoWithBonusGems,
    newLocales: localesAfterCompBonusGems,
  } = getBonusGems(computerPlayerInfo, locales);

  const { newPlayerInfo: playerInfoWithBonusGems, newLocales } = getBonusGems(
    currentPlayerInfo,
    localesAfterCompBonusGems
  );

  let updatedPublicCards;
  let updatedComputerInfoAfterReveal;
  const revealedCard = getComputerRevealedCard(computerInfoWithBonusGems);
  if (revealedCard) {
    const {
      updatedPublicCards: publicCardsAfterCompReveal,
      newComputerInfo: compInfoAfterReveal,
    } = revealCard({
      isCurrentPlayer: false,
      card: revealedCard,
      currentPlayerInfo: playerInfoWithBonusGems,
      computerPlayerInfo: computerInfoWithBonusGems,
      publicCards,
    });
    updatedPublicCards = publicCardsAfterCompReveal;
    updatedComputerInfoAfterReveal = compInfoAfterReveal;
  }

  const { updatedDrawPile, updatedPublicCards: newUpdatedPublicCards } =
    revealDrawPile({ drawPile, publicCards: updatedPublicCards });

  // TODO player reveal card

  const updatedComputerInfo = resetPawns(updatedComputerInfoAfterReveal);
  const updatedPlayerInfo = resetPawns(playerInfoWithBonusGems);

  const updatedLocales = resetPawnsOnLocales(newLocales);

  return {
    updatedComputerInfo,
    updatedPlayerInfo,
    updatedLocales,
    updatedPublicCards: newUpdatedPublicCards,
    updatedDrawPile,
  };
};

const revealCard = ({
  isCurrentPlayer,
  card,
  currentPlayerInfo,
  computerPlayerInfo,
  publicCards,
}) => {
  let newPlayerInfo;
  let newComputerInfo;
  if (isCurrentPlayer) {
    newPlayerInfo = removeCard(currentPlayerInfo, card);
  } else {
    newComputerInfo = removeCard(computerPlayerInfo, card);
  }
  return {
    updatedPublicCards: [...publicCards, card],
    newPlayerInfo,
    newComputerInfo,
  };
};
