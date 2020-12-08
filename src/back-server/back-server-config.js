import axios from 'axios';

export const backServer = axios.create({
  baseURL: 'http://localhost:3002/',
  responseType: 'json',
});
