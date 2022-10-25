import React from 'react';
import PropTypes from 'prop-types';
import Pawn from '../pawn/Pawn';
import { PAWN_COLOR_OPTIONS } from '../../utils/constants';
import './localeSlot.css';

const LocaleSlot = ({ isValid, pawnColor }) => {
  return (
    <>
      {isValid && (
        <div className="pawn-slot">
          {pawnColor && <Pawn color={pawnColor} />}
        </div>
      )}
      {!isValid && <div className="empty-slot"></div>}
    </>
  );
};

LocaleSlot.defaultProps = {
  isValid: false,
};

LocaleSlot.propTypes = {
  isValid: PropTypes.bool,
  pawnColor: PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS)),
};
export default LocaleSlot;
