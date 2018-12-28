import axios from 'axios';
import { host } from '../config';

export const getWalletAddress = id => {
  return axios.get(`${host}/api/v2/peatio/account/deposit_address/${id}`)
    .then(response => response.data);
};

const getBalances = () => {
  return axios.get(`${host}/api/v2/peatio/account/balances`)
    .then(response => response.data);
};

const getCurrencies = () => {
  return axios.get(`${host}/api/v2/peatio/public/currencies`)
    .then(response => response.data);
};

export const getWalletData = async () => {
  return await Promise.all([getBalances(), getCurrencies()]);
};
