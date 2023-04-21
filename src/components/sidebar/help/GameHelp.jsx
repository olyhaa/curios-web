import React, { useState } from 'react';
import './gameHelp.css';
import ReactModal from 'react-modal';
import GameRules from '../rules/GameRules';

const GameHelp = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };
  
  const handleCloseModal = () => {
        setIsOpen(false);
    };

  return (
      <div className="rules-container">
          <button className="rule-button" onClick={handleOpenModal}>
              Game Rules
          </button>
          <ReactModal
              isOpen={isOpen}
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              onRequestClose={handleCloseModal}
            contentLabel="Curios Game Rules"
            className="modal-container"
            overlayClassName="modal-overlay"
          >
            <div className="modal-header">
                <h1>Curios Game Rules</h1>              
                <button className='close-button' onClick={handleCloseModal}>
                    <span className="close-icon"></span>
                </button>    
            </div>
              
            <GameRules />
        </ReactModal>
    </div>
  );
};

export default GameHelp;
