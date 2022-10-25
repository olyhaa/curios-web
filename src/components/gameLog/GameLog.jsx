import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import './gameLog.css';

const GameLog = ({ log }) => {
  let count = 0;
  return (
    <div className="log-container">
      {map((logItem, index) => {
        return <div key={++count}>{logItem}</div>;
      }, log)}
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
