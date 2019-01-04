import axios from 'axios';
import { host } from '../config';
import store from '../store';
import { fetchLogout } from '../actions/auth';


const axiosInstance = axios.create({
  baseURL: host,
  //withCredentials: true,
});


axiosInstance.interceptors.response.use(
  response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      store.dispatch(fetchLogout()); //dispatch logout for each 401 Unauthorized
    }
    return error;
});

export default axiosInstance;

