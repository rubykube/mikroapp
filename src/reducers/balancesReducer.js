import queryString from 'query-string';

export default function (
  state = {
    list: [],
    activeBalance: null
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
    default:
  }

  return state;
}
