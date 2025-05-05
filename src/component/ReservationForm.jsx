import React from 'react';
import useForm from '../hooks/formHooks';
import {useReservation} from '../hooks/apiHooks';

const ReservationForm = () => {
  const {postReservation} = useReservation();
  const initValues = {
    person_id: 2,
    restaurant_id: 1,
  };

  const doReservation = async () => {
    console.log('register funktiota kutsuttu');
    inputs.table_id = 1;
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
              //autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="reservation_start">Start of Reservation</label>
            <input
              name="reservation_start"
              type="text"
              id="reservation_start"
              onChange={handleInputChange}
              //autoComplete="current-password"
            />
          </div>
          <div>
            <label htmlFor="reservation_end">End of Reservation</label>
            <input
              name="reservation_end"
              type="text"
              id="reservation_end"
              onChange={handleInputChange}
              //autoComplete="email"
            />
          </div>
          <button type="submit">Reserve</button>
        </form>
      </dialog>
    </>
  );
};

export default ReservationForm;
