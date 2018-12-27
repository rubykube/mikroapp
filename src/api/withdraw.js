import axios from 'axios';
import { host } from '../config';

export const postNewWithdraws = data => {
  return axios.post(`${host}/api/v1/applogic/withdraws`, data)//TODO add withCredentials flag for sending cookies
    .then(response => response.data);
};
