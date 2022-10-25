export const resetPawns = (playerInfo) => {
  return {
    ...playerInfo,
    pawnCount: playerInfo.maxPawnCount,
  };
};

export const getPawnsForSlot = (slot) => {
  switch (slot) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    default:
      return 4;
  }
};

export const resetPawnsOnLocales = (locales) => {
  return locales.map((locale) => {
    return {
      ...locale,
      slotsOccupied: [],
    };
  });
};

export const getMaxPawnCountColor = (slotsOccupied) => {
  const pawnCounts = [];
  for (let i = 0; i < slotsOccupied.length; i++) {
    const pawnColor = slotsOccupied?.[i];
    if (pawnColor) {
      pawnCounts.push({
        pawnColor,
        count:
          (pawnCounts.pawnColor ? pawnCounts.pawnColor : 0) +
          getPawnsForSlot(i + 1),
      });
    }
  }

  const maxPawns =
    pawnCounts.length > 0
      ? pawnCounts.reduce((prev, current) => {
          return prev.count > current.count ? prev : current;
        })
      : undefined;
  return maxPawns?.pawnColor;
};
