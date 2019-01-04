import { FETCH_ACCOUNT, SUCCESS_ACCOUNT, FAIL_ACCOUNT, SUCCESS_LOGOUT } from '../constants/actions';

export const fetchAccount = () => {
  return { type: FETCH_ACCOUNT };
};

export const successAccount = data => {
  return { type: SUCCESS_ACCOUNT, payload: { data } };
};

export const failAccount = () => {
  return { type: FAIL_ACCOUNT };
};

export const successLogout = () => {
  return { type: SUCCESS_LOGOUT };
};
