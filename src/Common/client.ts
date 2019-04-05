import axios from 'axios';
import { conf } from "../config";

export const client = axios.create({
  baseURL: conf.apiUrl,
  timeout: 6000,
  headers: { 'gaga': 'evilbinary' }
});
