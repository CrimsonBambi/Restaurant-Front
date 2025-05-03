import React from 'react';
import useForm from '../hooks/formHooks';

const ReservationForm = () => {
  /*const initValues = {
    username: '',
    password: '',
  };*/

  const doReservation = async () => {
    console.log('register funktiota kutsuttu');
    console.log('inputs', inputs);
    //await postUser(inputs);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doReservation
    /*initValues*/
  );

  return (
    <>
      <dialog open>
        <h1>Reservation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reservation-name">Reservation Name</label>
            <input
              name="reservation-name"
              type="text"
              id="reservation-name"
              onChange={handleInputChange}
              //autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="reservation-start">Start of Reservation</label>
            <input
              name="reservation-start"
              type="text"
              id="reservation-start"
              onChange={handleInputChange}
              //autoComplete="current-password"
            />
          </div>
          <div>
            <label htmlFor="reservation-end">End of Reservation</label>
            <input
              name="reservation-end"
              type="text"
              id="reservation-end"
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
