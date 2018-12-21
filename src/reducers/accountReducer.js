import { FETCH_ACCOUNT, SUCCESS_ACCOUNT, FAIL_ACCOUNT } from '../constants/actions';


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
  isFetching: false,
  error: false,
};

function accountReducer(state=initState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_ACCOUNT: {
      return { ...state, isFetching: false, data: action.payload.data };
    }
    case FAIL_ACCOUNT: {
      return { ...state, isFetching: false, error: true };
    }
    default:
      return state;
  }
}

export default accountReducer;
