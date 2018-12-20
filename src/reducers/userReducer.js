export default function (
  state = {
    list: [],
    activeBalance: null
  },
  action
) {
  switch (action.type) {
    case 'balances/SET_ACTIVE_BALANCE': {
      state = {
        ...state,
        activeBalance: action.payload.balanceId
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
