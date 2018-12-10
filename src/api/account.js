import axios from 'axios';
import { host } from '../config';

export const getAccount = () => {
  return axios.get(`${host}/api/v2/barong/resource/users/me`)
    .then(response => response.data)
    .catch(err => err);
};
