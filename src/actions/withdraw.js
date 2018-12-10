import {
  FETCH_SUBMIT_WITHDRAW,
  SUCCESS_SUBMIT_WITHDRAW,
  FAIL_SUBMIT_WITHDRAW,
  HANDLE_CHANGE_WITHDRAW,
  CLEAR_WITHDRAW_FORM,
} from '../constants/actions';

export const fetchSubmitWithdraw = () => {
  return { type: FETCH_SUBMIT_WITHDRAW };
};

export const successSubmitWithdraw = () => {
  return { type: SUCCESS_SUBMIT_WITHDRAW };
};

export const failSubmitWithdraw = error => {
  return { type: FAIL_SUBMIT_WITHDRAW, payload: { error } };
};

export const handleChangeWithdraw = (field, value) => {
  return { type: HANDLE_CHANGE_WITHDRAW, payload: { field, value } };
};

export const clearWithdrawForm = () => {
  return { type: CLEAR_WITHDRAW_FORM };
};
