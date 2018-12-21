import {
  FETCH_WALLET_DATA,
  SUCCESS_WALLET_DATA,
  FAIL_WALLET_DATA,
  SET_ACTIVE_WALLET,
  FETCH_WALLET_ADDRESS,
  SUCCESS_WALLET_ADDRESS,
  FAIL_WALLET_ADDRESS,
} from '../constants/actions';


const initState = {
  list: {},
  history: {
    deposits: [],
    withdraws: []
  },
  activeWallet: null,
  isFetching: false,
  error: false,
};

function walletReducer(state=initState, action) {
  switch (action.type) {
    case FETCH_WALLET_DATA: {
      return { ...state, isFetching: true }
    }
    case SUCCESS_WALLET_DATA: {
      return { ...state, isFetching: false, list: action.payload.data }
    }
    case FAIL_WALLET_DATA: {
      return { ...state, isFetching: false, error: true }
    }
    case SET_ACTIVE_WALLET: {
      return { ...state, activeWallet: action.payload.id }
    }
    case SUCCESS_WALLET_ADDRESS: {
      return { ...state, list: action.payload.list }
    }
    case FAIL_WALLET_ADDRESS: {
      return { ...state, list: action.payload.list }
    }

    case 'balances/SET_DEPOSITS_HISTORY': {
      return {
        ...state,
        history: {
          ...state.history,
          deposits: action.payload.history
        }
      };
    }
    case 'balances/SET_WITHDRAWS_HISTORY': {
      return {
        ...state,
        history: {
          ...state.history,
          withdraws: action.payload.history
        }
      };
    }
    default: {
      return state;
    }
  }
}

export default walletReducer;

