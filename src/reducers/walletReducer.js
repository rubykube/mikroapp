import queryString from 'query-string';

import {
  FETCH_WALLET_DATA,
  SUCCESS_WALLET_DATA,
  FAIL_WALLET_DATA,
  SET_ACTIVE_WALLET,
  // FETCH_WALLET_ADDRESS,
  SUCCESS_WALLET_ADDRESS,
  FAIL_WALLET_ADDRESS,
} from '../constants/actions';

const initState = {
  list: {},
  activeWallet: null,
  isFetching: false,
  error: false,
};

function walletReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_WALLET_DATA: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_WALLET_DATA: {
      return { ...state, isFetching: false, list: action.payload.data };
    }
    case FAIL_WALLET_DATA: {
      return { ...state, isFetching: false, error: true };
    }
    case SET_ACTIVE_WALLET: {
      return { ...state, activeWallet: action.payload.id };
    }
    case SUCCESS_WALLET_ADDRESS: {
      return { ...state, list: action.payload.list };
    }
    case FAIL_WALLET_ADDRESS: {
      return { ...state, list: action.payload.list };
    }
    case '@@router/LOCATION_CHANGE': {
      return {
        ...state,
        activeWallet: queryString.parse(action.payload.location.search).currency
      };
    }
    default: {
      return state;
    }
  }
}

export default walletReducer;
