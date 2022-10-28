import { getPawnsForSlot, getMaxPawnCountColor } from './pawnActions';

export const computerClaimArtifact = (pawnsAvailable, locales) => {
  const availableLocales = locales.filter((locale) => {
    const neededPawns = getPawnsForSlot(locale.slotsOccupied.length + 1);
    return neededPawns <= pawnsAvailable && locale.gemCount > 0;
  });

  const randomLocale =
    availableLocales[Math.floor(Math.random() * availableLocales.length)];
  return randomLocale?.color;
};

export const claimArtifact = (playerInfo, artifactColor, locales) => {
  const { pawnCount, gems, color: playerColor, score } = playerInfo;
  const currentLocale = locales.filter((locale) => {
    return locale.color === artifactColor;
  })[0];
  const neededPawns = getPawnsForSlot(currentLocale.slotsOccupied.length + 1);

  if (neededPawns > pawnCount || currentLocale.gemCount <= 0) {
    return { isError: true };
  }

  const updatedPawnCount = pawnCount - neededPawns;

  const updatedGems = gems.map((gem) => {
    const { color, count } = gem;
    if (color === artifactColor) {
      return { ...gem, color, count: count + 1 };
    }
    return gem;
  });

  const updatedLocales = locales.map((locale) => {
    const { color, gemCount, slotsOccupied } = locale;
    if (color === artifactColor) {
      return {
        ...locale,
        color,
        gemCount: gemCount - 1,
        slotsOccupied: [...slotsOccupied, playerColor],
      };
    }
    return locale;
  });

  return {
    newPlayerInfo: {
      ...playerInfo,
      gems: updatedGems,
      pawnCount: updatedPawnCount,
      score: score + currentLocale.card.number,
    },
    newLocales: updatedLocales,
  };
};

export const getBonusGems = (playerInfo, locales) => {
  const { gems, color: playerColor, score } = playerInfo;
  let updatedGems = gems;
  let updatedScore = score;

  const updatedLocales = locales.map((locale) => {
    const { gemCount, slotsOccupied, color: artifactColor, card } = locale;
    const maxColor = getMaxPawnCountColor(slotsOccupied);
    if (maxColor === playerColor && gemCount > 0) {
      updatedGems = gems.map((gem) => {
        const { color, count } = gem;
        if (color === artifactColor) {
          // TODO add to log
          console.log('💎 awarding ' + color + ' gem to ' + playerColor);
          updatedScore = updatedScore + card.number;
          return { ...gem, color, count: count + 1 };
        }
        return gem;
      });

      return {
        ...locale,
        gemCount: gemCount - 1,
      };
    } else {
      return locale;
    }
  });

  return {
    newPlayerInfo: {
      ...playerInfo,
      gems: updatedGems,
      score: updatedScore,
    },
    newLocales: updatedLocales,
  };
};

export const countLocalesWithGems = (locales) => {
  return locales
    ? locales.filter((locale) => {
        const { gemCount } = locale;
        return gemCount > 0;
      }).length
    : 0;
};
