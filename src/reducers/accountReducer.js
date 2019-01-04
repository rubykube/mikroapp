import { FETCH_ACCOUNT, SUCCESS_ACCOUNT, FAIL_ACCOUNT, SUCCESS_LOGOUT } from '../constants/actions';

const initState = {
  data: {
    created_at: '',
    email: '',
    id: 0,
    level: 0,
    otp: false,
    role: '',
    state: '',
    uid: '',
    updated_at: '',
  },
  isFetching: true,
  error: false
};

function accountReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT: {
      return { ...state };
    }
    case SUCCESS_ACCOUNT: {
      return { ...state, isFetching: false, data: action.payload.data };
    }
    case FAIL_ACCOUNT: {
      return { ...state, isFetching: false, error: true };
    }
    case SUCCESS_LOGOUT: {
      return { ...state, data: initState.data };
    }
    default:
      return state;
  }
}

export default accountReducer;
