import {
  FETCH_HISTORY,
  SUCCESS_HISTORY,
  FAIL_HISTORY,
} from '../constants/actions';

export const fetchHistory = type => {
  return { type: FETCH_HISTORY, payload: { type } };
};

export const successHistory = (type, history) => {
  return { type: SUCCESS_HISTORY, payload: { type, history } };
};

export const failHistory = (type) => {
  return { type: FAIL_HISTORY, payload: { type } };
};
