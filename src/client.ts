import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:3200',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });