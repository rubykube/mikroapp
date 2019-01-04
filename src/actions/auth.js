import {
  FETCH_LOGOUT,
  FAIL_LOGOUT,
  FETCH_LOGIN,
  FAIL_LOGIN,
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
