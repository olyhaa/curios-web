import React from 'react';
import { map } from 'ramda';
import './gameLog.css';
import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { GameLogAtom } from '../../../state/logAtom';
import GameHelp from '../help/GameHelp';

const GameLog = () => {
  let count = 0;
  const lastItemElem = useRef();
  const log = useRecoilValue(GameLogAtom);

  const scrollToBottom = () => {
    lastItemElem.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [log]);

  return (
    <div className="log-container">
      <div className="log-title">
        Game Log
        <GameHelp />
      </div>
      <div className='log-items'>
        {map(({ item, source }, index) => {
          return (
            <div key={++count} className={`log-${source}`}>
              {item}
            </div>
          );
        }, log)}
        <div className="lastItem" ref={lastItemElem} />
        </div>
    </div>
  );
};

export default GameLog;
