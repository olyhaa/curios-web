import { useSetRecoilState } from 'recoil';
import { GameLogAtom } from '../state/logAtom';
import { LOG_SOURCES } from './constants';

export const useLog = () => {
  const setGameLog = useSetRecoilState(GameLogAtom);

  return (newItem, logSource = LOG_SOURCES.GAME) => {
    setGameLog((oldArray) => [
      ...oldArray,
      { item: newItem, source: logSource },
    ]);
  };
};
