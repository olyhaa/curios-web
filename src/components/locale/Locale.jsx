import React from 'react';
import PropTypes from 'prop-types';
import LocaleSlot from './LocaleSlot';
import { CARD_COLOR_OPTIONS, PAWN_COLOR_OPTIONS } from '../../utils/constants';
import './locale.css';

const Locale = ({ slotsOccupied, color, handleSelectLocale, isPlayerTurn }) => {
  return (
    <div
      className={`locale-card-${color}`}
      onClick={isPlayerTurn ? () => handleSelectLocale(true, color) : () => {}}
    >
      <LocaleSlot />
      <LocaleSlot />
      <LocaleSlot />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[3]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[4]} />

      <LocaleSlot />
      <LocaleSlot />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[2]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[3]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[4]} />

      <LocaleSlot />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[1]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[2]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[3]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[4]} />

      <LocaleSlot isValid pawnColor={slotsOccupied?.[0]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[1]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[2]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[3]} />
      <LocaleSlot isValid pawnColor={slotsOccupied?.[4]} />
    </div>
  );
};

Locale.defaultProps = {
  slotsOccupied: [],
};

Locale.propTypes = {
  slotsOccupied: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(PAWN_COLOR_OPTIONS))
  ),
  color: PropTypes.oneOf(Object.values(CARD_COLOR_OPTIONS)),
  handleSelectLocale: PropTypes.func,
};
export default Locale;
