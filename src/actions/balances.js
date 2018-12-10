export function setActiveBalance(balanceId) {
  return {
    type: 'balances/SET_ACTIVE_BALANCE',
    payload: {
      balanceId
    }
  };
}


export function setBalances(balances) {
  return {
    type: 'balances/SET_BALANCES',
    payload: {
      balances
    }
  };
}
