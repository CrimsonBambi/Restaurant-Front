import { React, useState, useContext, useEffect } from 'react';
import useForm from '../hooks/formHooks';
import { useReservation } from '../hooks/apiHooks';
import { UserContext } from '../context/UserContext';
import DishSelection from './DishSelection';
import '../css/reservationform.css';

const ReservationForm = ({ onClose }) => {
  const [showDishSelect, setDishSelect] = useState(false);
  const { user } = useContext(UserContext);
  const { postReservation } = useReservation();
  let idOfUser = user ? user.id : 2;

  const initValues = {
    person_id: idOfUser,
    restaurant_id: 1,
  };

  const doReservation = async () => {
    inputs.registered_user = 1;
    await postReservation(inputs);
    setDishSelect(true);
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doReservation,
    initValues
  );

  
  const handleTableChange = (e) => {
    const value = e.target.value;
    if (value >= 1 || value === '') {
      handleInputChange(e);  
    }
  };

  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };


  const handleDishSelectionClose = () => {
    setDishSelect(false);
    onClose();
  };


  return (
    <div className="reservation-dialog" onClick={handleBackdropClick}>
      <div className="reservation-modal">
        <button className="dialog-close-button" onClick={onClose}>
          &times;
        </button>
        <h1>Reservation</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reservation_name">Reservation Name</label>
            <input
              name="reservation_name"
              type="text"
              id="reservation_name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_start">Start of Reservation</label>
            <input
              name="reservation_start"
              type="datetime-local"
              id="reservation_start"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_end">End of Reservation</label>
            <input
              name="reservation_end"
              type="datetime-local"
              id="reservation_end"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="table_id">Table</label>
            <input
              name="table_id"
              type="number"
              id="table_id"
              value={inputs.table_id}
              onChange={handleTableChange}
              min="1"  
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              onClick={() => {
                console.log('edit button clicked');
                setDishSelect(true);
              }}
            >
              Reserve
            </button>
          </div>
        </form>
        
        {showDishSelect && (
          <DishSelection
            onClose={handleDishSelectionClose}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
