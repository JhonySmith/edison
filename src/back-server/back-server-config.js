import axios from 'axios';

export const backServer = axios.create({
  baseURL: 'https://tranquil-savannah-95903.herokuapp.com',
  responseType: 'json',
});
