export function setDepositsHistory(history) {
  return {
    type: 'balances/SET_DEPOSITS_HISTORY',
    payload: {
      history
    }
  };
}

export function setWithdrawsHistory(history) {
  return {
    type: 'balances/SET_WITHDRAWS_HISTORY',
    payload: {
      history
    }
  };
}
