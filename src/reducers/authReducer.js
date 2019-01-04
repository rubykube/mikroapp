import {
  FETCH_LOGOUT,
  FAIL_LOGOUT,
  FETCH_LOGIN,
  FAIL_LOGIN,
} from '../constants/actions';

const initState = {
  errorLogin: null,
  errorLogout: null,
};

function authReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_LOGOUT: {
      return { ...state };
    }
    case FAIL_LOGOUT: {
      return { ...state, errorLogout: action.payload.message };
    }
    case FETCH_LOGIN: {
      return { ...state, errorLogin: null };
    }
    case FAIL_LOGIN: {
      return { ...state, errorLogin: action.payload.message };
    }
    default:
      return state;
  }
}

export default authReducer;
