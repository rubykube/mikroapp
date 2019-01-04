import { FETCH_USER, SUCCESS_USER, FAIL_USER, RESET_USER } from '../constants/actions';

export const fetchUser = () => {
  return { type: FETCH_USER };
};

export const successUser = data => {
  return { type: SUCCESS_USER, payload: { data } };
};

export const failUser = () => {
  return { type: FAIL_USER };
};

export const resetUser = () => {
  return { type: RESET_USER };
};

