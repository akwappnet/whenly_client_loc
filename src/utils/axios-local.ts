import axios from 'axios';
import {API_URL} from '@env';

const instance = axios.create({
  baseURL: 'http://projects.wappnet.us:5001/',
});

export default instance;
