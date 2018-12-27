import axios from 'axios';
import { host } from '../config';


export const getHistory = (type, id) => {
  return axios.get(`${host}/api/v2/peatio/account/${type}?currency=${id}`)
    .then(response => response.data);
};
