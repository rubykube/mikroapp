import {
  FETCH_LOGOUT,
  FAIL_LOGOUT,
  FETCH_LOGIN,
  FAIL_LOGIN,
  FETCH_SIGNUP,
  FAIL_SIGNUP,
} from '../constants/actions';


export const fetchLogout = () => {
  return { type: FETCH_LOGOUT };
};

export const failLogout = message => {
  return { type: FAIL_LOGOUT, payload: { message } };
};

export const fetchLogin = (email, password) => {
  return { type: FETCH_LOGIN, payload: { email, password } };
};

export const failLogin = message => {
  return { type: FAIL_LOGIN, payload: { message } };
};

export const fetchsignup = (email, password) => {
  return { type: FETCH_SIGNUP, payload: { email, password } };
};

export const failsignup = message => {
  return { type: FAIL_SIGNUP, payload: { message } };
};
