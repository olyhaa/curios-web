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
      {map((logItem, index) => {
        return <div key={++count}>{logItem}</div>;
      }, log)}
      <div className="lastItem" ref={lastItemElem} />
    </div>
  );
};

GameLog.defaultProps = {
  log: [],
};

GameLog.propTypes = {
  log: PropTypes.arrayOf(PropTypes.string),
};
export default GameLog;
