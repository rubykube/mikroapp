import {
  FETCH_WALLET_DATA,
  SUCCESS_WALLET_DATA,
  FAIL_WALLET_DATA,
  SET_ACTIVE_WALLET,
  FETCH_WALLET_ADDRESS,
  FAIL_WALLET_ADDRESS,
  SUCCESS_WALLET_ADDRESS
} from '../constants/actions';

export const fetchWalletData = () => {
  return { type: FETCH_WALLET_DATA };
};

export const successWalletData = data => {
  return { type: SUCCESS_WALLET_DATA, payload: { data } };
};

export const failWalletData = () => {
  return { type: FAIL_WALLET_DATA };
};

export const setActiveWallet = id => {
  return { type: SET_ACTIVE_WALLET, payload: { id } };
};

export const fetchWalletAddress = id => {
  return { type: FETCH_WALLET_ADDRESS, payload: { id } };
};

export const successWalletAddress = list => {
  return { type: SUCCESS_WALLET_ADDRESS, payload: { list } };
};

export const failWalletAddress = list => {
  return { type: FAIL_WALLET_ADDRESS, payload: { list } };
};
