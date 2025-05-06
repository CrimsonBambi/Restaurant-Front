import React from 'react';
import {UserContext} from '../context/UserContext';
import {useReservation} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const DishSelection = () => {
  const {getReservationFromUserId, postSelectedDish} = useReservation();
  const {user} = UserContext;
  let idOfUser = user ? user.id : 2;
  const getReservation = async () => {
    console.log('reservation for', idOfUser);
    const reservationId = await getReservationFromUserId(idOfUser);
    return reservationId[0].id;
  };
  const initValues = {
    reservation_id: getReservation(),
  };

  const doDishSelection = async () => {
    const reservationId = await getReservation();
    console.log('Reservation selected dishes', reservationId);
    console.log('register funktiota kutsuttu');
    console.log('inputs', inputs);
    await postSelectedDish(inputs);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doDishSelection,
    initValues
  );
  return (
    <>
      <dialog open>
        <h1>Choose Dish</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dish_id">Dish Number</label>
            <input
              name="dish_id"
              type="number"
              id="dish_id"
              onChange={handleInputChange}
            />
            <button type="submit">Reserve Dishes</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default DishSelection;
