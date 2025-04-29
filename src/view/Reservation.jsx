import {React, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Reservation = () => {
  let events = [
    {
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      title: 'Table 2 reservation',
    },
  ];
  const [myEvents, setEvents] = useState(events);

  const updateEvents = (start, end, title) => {
    setEvents((prev) => [...prev, {start, end, title}]);
  };

  return (
    <>
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={myEvents}
          style={{height: '100vh'}}
        />
      </div>
      <div>
        <input type="text"></input>
        <input type="text"></input>
        <button
          onClick={() => {
            console.log(
              'valid date: ' +
                moment('20.07.2018 09:19', moment.defaultFormat).toDate()
            );
            console.log(
              'invalid date: ' +
                moment('30.04.2024 12:00', moment.defaultFormat).toDate()
            );
            console.log('start', moment().toDate());
            console.log('end', moment().add(5, 'hours').toDate());
            console.log(
              moment('2025-04-30 09:30', moment.defaultFormat).toDate()
            );

            updateEvents(
              moment('2025-04-30 09:30', moment.defaultFormat).toDate(),
              moment('2025-04-30 12:00', moment.defaultFormat).toDate(),
              'Reservation'
            );
          }}
          type="button"
        >
          Reservation
        </button>
      </div>
    </>
  );
};
export default Reservation;
