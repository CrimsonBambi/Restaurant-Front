import {React, useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import {useReservation} from '../hooks/apiHooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Reservation = () => {
  const {getReserations} = useReservation();

  let events = [];
  const [myEvents, setEvents] = useState(events);

  const updateEvents = (start, end, title) => {
    setEvents((prev) => [...prev, {start, end, title}]);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await getReserations();
        console.log(reservations);
        reservations.forEach((element) => {
          updateEvents(
            moment(element.reservation_start, moment.defaultFormat).toDate(),
            moment(element.reservation_end, moment.defaultFormat).toDate(),
            element.reservation_name
          );
        });
      } catch (error) {
        console.error('Encountered error getting reservations' + error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <>
      <div className="Reservation-View">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={myEvents}
          style={{height: '100vh'}}
        />
      </div>
    </>
  );
};
export default Reservation;
