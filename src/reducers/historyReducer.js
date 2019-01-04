import {
  FETCH_HISTORY,
  SUCCESS_HISTORY,
  FAIL_HISTORY,
} from '../constants/actions';

const initState = {
  isFetching: false,
  deposits: [],
  withdraws: [],
  error: false,
};

function historyReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_HISTORY: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_HISTORY: {
      return { ...state, [action.payload.type]: action.payload.history, isFetching: false };
    }
    case FAIL_HISTORY: {
      return { ...state, [action.payload.type]: [], isFetching: false };
    }
    default: {
      return state;
    }
  }
}

export default historyReducer;
