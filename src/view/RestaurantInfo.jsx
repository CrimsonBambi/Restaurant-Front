import React, {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';
import '../css/info.css';

const RestaurantInfo = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [openingHours, setOpeningHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const info = await fetchData(
          'https://10.120.32.81/restaurant/api/v1/info'
        );
        const hours = await fetchData(
          'https://10.120.32.81/restaurant/api/v1/opening-hours/1'
        );
        setRestaurantInfo(info);
        setOpeningHours(hours);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="restaurant-webpage">
      <main>
        <div id="restaurant-container">
          <div id="restaurant-heading-container"></div>
          <div id="restaurant-content">
            <div id="restaurant-info">
              {restaurantInfo && (
                <div>
                  <h3>{restaurantInfo.name}</h3>
                  <p>
                    {restaurantInfo.address}, {restaurantInfo.postal_code}{' '}
                    {restaurantInfo.city}
                  </p>
                  <p>Puh.nro: {restaurantInfo.contact_number}</p>
                  <p>Sähköposti: {restaurantInfo.email}</p>
                </div>
              )}
            </div>

            <div id="opening-hours">
              <h3>Aukioloajat</h3>
              {openingHours.length > 0 ? (
                <ul>
                  {openingHours.map((hour) => (
                    <li key={hour.weekday}>
                      {hour.weekday}: {hour.open_time} - {hour.closed_time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No opening hours available.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantInfo;
