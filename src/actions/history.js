import {
  FETCH_HISTORY,
  SUCCESS_HISTORY,
  FAIL_HISTORY,
} from '../constants/actions';


export const fetchHistory = historyType => {
  return { type: FETCH_HISTORY, payload: { historyType } };
};

export const successHistory = (historyType, list) => {
  return { type: SUCCESS_HISTORY, payload: { historyType, list } };
};

export const failHistory = historyType => {
  return { type: FAIL_HISTORY, payload: { historyType } };
};
