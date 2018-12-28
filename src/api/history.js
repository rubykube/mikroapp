import axios from 'axios';
import { host } from '../config';


export const getDepositHistory = id => {
  return axios.get(`${host}/api/v2/peatio/account/deposits?currency=${id}`)
    .then(response => response.data);
};

export const getWithdrawHistory = id => {
  return axios.get(`${host}/api/v2/peatio/account/withdraws?currency=${id}`)
    .then(response => response.data);
};


export const getHistory = async id => {
  return await Promise.all([getDepositHistory(id), getWithdrawHistory(id)]);
};
