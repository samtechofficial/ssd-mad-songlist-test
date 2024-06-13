import axios from 'axios';
import { API } from '../../config';

export const axiosClient = axios.create({
  baseURL: API,
  timeout: 10000,
});