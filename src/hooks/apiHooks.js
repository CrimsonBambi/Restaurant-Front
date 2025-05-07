import React from 'react';
import {fetchData} from '../utils/fetchData.js';

const reserveUrl = 'https://10.120.32.81/restaurant/api/v1/reserve';
const localReserveUrl = 'localhost:3000/api/v1/reserve';

const useReservation = () => {
  const postReservation = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    console.log('inputs in promise', inputs);
    return await fetchData(reserveUrl, fetchOptions);
  };
  const getReserations = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return await fetchData(reserveUrl, fetchOptions);
  };
  const getReservationFromUserId = async (id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return await fetchData(`${localReserveUrl}/user/${id}`, fetchOptions);
  };
  const postSelectedDish = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    console.log('inputs in promise', inputs);
    return await fetchData(`${localReserveUrl}/dish`, fetchOptions);
  };
  return {
    postReservation,
    getReserations,
    getReservationFromUserId,
    postSelectedDish,
  };
};

export {useReservation};
