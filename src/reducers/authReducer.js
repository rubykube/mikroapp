import {
  FETCH_LOGOUT,
  FAIL_LOGOUT,
  FETCH_LOGIN,
  FAIL_LOGIN,
  FETCH_SIGNUP,
  FAIL_SIGNUP,
} from '../constants/actions';

const initState = {
  errorLogin: null,
  errorLogout: null,
  errorSignup: null
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
    case FETCH_SIGNUP: {
      return { ...state, errorSignup: null };
    }
    case FAIL_SIGNUP: {
      return { ...state, errorSignup: action.payload.message };
    }
    default:
      return state;
  }
}

export default authReducer;
