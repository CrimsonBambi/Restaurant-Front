import React from 'react';
import {UserContext} from '../context/UserContext';
import {useReservation} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const DishSelection = () => {
  const {user} = UserContext;
  const {postReservation} = useReservation();
  //let idOfUser = user ? user.id : 2;

  const getReservation = async () => {
    return await getReservationFromUserId();
  };

  const doReservation = async () => {
    console.log('register funktiota kutsuttu');
    console.log('inputs', inputs);
    await postSelectedDish(getReservation, inputs);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doReservation);
  return (
    <>
      <dialog open>
        <h1>Reservation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dish_id">Reservation Name</label>
            <input
              name="dish_id"
              type="number"
              id="dish_id"
              onChange={handleInputChange}
            />
          </div>
        </form>
      </dialog>{' '}
    </>
  );
};

export default DishSelection;
