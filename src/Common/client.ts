import axios from 'axios';
export const baseApiUrl = 'http://localhost:3201';
// export const baseApiUrl = 'http://eatery.evilbinary.org/api/';
// 
export const client = axios.create({
  baseURL: baseApiUrl,
  timeout: 1000,
  headers: { 'gaga': 'evilbinary' }
});
