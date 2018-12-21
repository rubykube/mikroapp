import axios from 'axios';
import { host } from '../config';

const requestCreator = (method, url, config={}) => {
  return axios[method](`${host}${url}`, config)
    .then(response => response.data)
    .catch(err => err);
}

export default requestCreator;