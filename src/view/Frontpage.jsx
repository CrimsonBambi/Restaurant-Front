import React from 'react';
import '../css/frontpage.css';

const Frontpage = () => {
  return (
    <>
      <div id="page-container">
        <div id="page-content">
          <div id="center-elements">
            <button id="back-direction-button">&lt;</button>
            <div id="primary-image"></div>
            <button id="forward-direction-button">&gt;</button>
          </div>
          <div id="overlaid-text">
            A Symphony of Flavours Crafted To Perfection
          </div>
          <div id="reservation-space">
            <button id="reservation">Varaa Pöytä</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Frontpage;
