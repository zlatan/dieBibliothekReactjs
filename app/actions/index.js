import axios from 'axios';

export const FETCH_WEATHER = 'FETCH_WEATHER';
const BASE_URL ='http://localhost:8090/api';


export function fetchWeather(size,page,sort) {
  const url = `${BASE_URL}/book?size=${size}&page=${page}&sort=${sort}`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
