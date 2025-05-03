import {React, useState} from 'react';
import '../css/frontpage.css';
import ReservationForm from '../component/ReservationForm';

const Frontpage = () => {
  const [showEdit, setShowEdit] = useState(false);

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
            <button
              id="reservation"
              onClick={() => {
                console.log('edit button clicked');
                setShowEdit(true);
              }}
            >
              Varaa Pöytä
            </button>
            {showEdit && <ReservationForm onClose={() => setShowEdit(false)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Frontpage;
