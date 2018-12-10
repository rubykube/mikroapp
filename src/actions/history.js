import {
  FETCH_HISTORY,
  SUCCESS_HISTORY,
  FAIL_HISTORY,
} from '../constants/actions';


export const fetchHistory = id => {
  return { type: FETCH_HISTORY, payload: { id } };
};

export const successHistory = (deposits, withdraws) => {
  return { type: SUCCESS_HISTORY, payload: { deposits, withdraws } };
};

export const failHistory = () => {
  return { type: FAIL_HISTORY  };
};
