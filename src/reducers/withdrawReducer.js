import {
  FETCH_SUBMIT_WITHDRAW,
  SUCCESS_SUBMIT_WITHDRAW,
  FAIL_SUBMIT_WITHDRAW,
  HANDLE_CHANGE_WITHDRAW,
  CLEAR_WITHDRAW_FORM,
} from '../constants/actions';

const initState = {
  isFetching: false,
  rid: '',
  amount: '',
  otp: '',
  error: '',
};

function withdrawReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_SUBMIT_WITHDRAW: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_SUBMIT_WITHDRAW: {
      return { ...state, isFetching: false };
    }
    case FAIL_SUBMIT_WITHDRAW: {
      return { ...state, isFetching: false, error: action.payload.error };
    }
    case HANDLE_CHANGE_WITHDRAW: {
      return { ...state, [action.payload.field]: action.payload.value };
    }
    case CLEAR_WITHDRAW_FORM: {
      return { ...state, rid: '', amount: '', otp: '' };
    }
    default: {
      return state;
    }
  }
}

export default withdrawReducer;
