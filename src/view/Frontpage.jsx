import { React, useState } from 'react';
import '../css/frontpage.css';
import ReservationForm from '../component/ReservationForm';

import front1 from '../assets/front1.jpg';
import front2 from '../assets/front2.jpg';
import front3 from '../assets/front3.jpg';
import front4 from '../assets/front4.jpg';

const Frontpage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [front1, front2, front3, front4];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div id="page-container">
        <div id="page-content">
          <div id="center-elements">
            <button id="back-direction-button" onClick={handlePreviousImage}>
              &lt;
            </button>
            <div id="primary-image">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Carousel ${index}`}
                  className={index === currentImageIndex ? 'active' : ''}
                />
              ))}
            </div>
            <button id="forward-direction-button" onClick={handleNextImage}>
              &gt;
            </button>
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