import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import './gameLog.css';
import { useRef, useEffect } from 'react';

const GameLog = ({ log }) => {
  let count = 0;
  const lastItemElem = useRef();

  const scrollToBottom = () => {
    lastItemElem.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [log]);

  return (
    <div className="log-container">
      {map(({ item, source }, index) => {
        return (
          <div key={++count} className={`log-${source}`}>
            {item}
          </div>
        );
      }, log)}
      <div className="lastItem" ref={lastItemElem} />
    </div>
  );
};

GameLog.defaultProps = {
  log: [],
};

GameLog.propTypes = {
  log: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string,
      source: PropTypes.string,
    })
  ),
};
export default GameLog;
