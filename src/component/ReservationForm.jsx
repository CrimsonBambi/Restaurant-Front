import {React, useState} from 'react';
import useForm from '../hooks/formHooks';
import {useReservation} from '../hooks/apiHooks';
import {UserContext} from '../context/UserContext';
import DishSelection from './DishSelection';

const ReservationForm = () => {
  const [showDishSelect, setDishSelect] = useState(false);
  const {user} = UserContext;
  const {postReservation} = useReservation();
  let idOfUser = user ? user.id : 2;

  const initValues = {
    person_id: idOfUser,
    restaurant_id: 1,
  };

  const doReservation = async () => {
    console.log('register funktiota kutsuttu');
    inputs.registered_user = 1;
    console.log('inputs', inputs);
    await postReservation(inputs);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doReservation,
    initValues
  );

  return (
    <>
      {console.log(idOfUser)}
      {console.log(idOfUser)}
      <dialog open>
        <h1>Reservation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reservation_name">Reservation Name</label>
            <input
              name="reservation_name"
              type="text"
              id="reservation_name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="reservation_start">Start of Reservation</label>
            <input
              name="reservation_start"
              type="text"
              id="reservation_start"
              placeholder="YYYY-MM-DD HH:MM"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="reservation_end">End of Reservation</label>
            <input
              name="reservation_end"
              type="text"
              id="reservation_end"
              placeholder="YYYY-MM-DD HH:MM"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="table_id">Table</label>
            <input
              name="table_id"
              type="number"
              id="table_id"
              placeholder="YYYY-MM-DD HH:MM"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="table_id">Table</label>
            <input
              name="table_id"
              type="number"
              id="table_id"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              console.log('edit button clicked');
              setDishSelect(true);
            }}
          >
            Reserve
          </button>
          {showDishSelect && (
            <DishSelection onClose={() => setDishSelect(false)} />
          )}
        </form>
      </dialog>
    </>
  );
};

export default ReservationForm;
