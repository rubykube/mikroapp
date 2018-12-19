import queryString from 'query-string';

export default function (
  state = {
    list: [],
    activeBalance: null,
    addresses: {},
    history: {
      deposits: [],
      withdraws: []
    }
  },
  action
) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      state = {
        ...state,
        activeBalance: queryString.parse(action.payload.location.search).currency
      };

      break;
    }
    case 'balances/SET_BALANCES': {
      state = {
        ...state,
        list: action.payload.balances
      };

      break;
    }
    case 'balances/SET_WALLET_ADDRESS': {
      state = {
        ...state,
        addresses: {
          ...state.addresses,
          [action.payload.currency]: action.payload.address
        }
      };

      break;
    }
    case 'balances/SET_DEPOSITS_HISTORY': {
      state = {
        ...state,
        history: {
          ...state.history,
          deposits: action.payload.history
        }
      };

      break;
    }
    case 'balances/SET_WITHDRAWS_HISTORY': {
      state = {
        ...state,
        history: {
          ...state.history,
          withdraws: action.payload.history
        }
      };

      break;
    }
    default:
  }

  return state;
}
