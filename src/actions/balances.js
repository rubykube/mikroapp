import { push } from 'connected-react-router';

export function setActiveBalance(balanceId) {
  // return {
  //   type: 'balances/SET_ACTIVE_BALANCE',
  //   payload: {
  //     balanceId
  //   }
  // };

  return push({
    search: `?currency=${balanceId}`
  });
}

export function setBalances(balances) {
  return dispatch => {
    dispatch({
      type: 'balances/SET_BALANCES',
      payload: {
        balances: balances.map(({currency, balance, locked}) => ({
          currency,
          balance: +balance, // Convert to numeric
          locked: +locked // Convert to numeric
        }))
      }
    });

    dispatch(setActiveBalance(balances[0].currency));
  };
}

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

export function setWalletAddress({currency, address}) {
  return {
    type: 'balances/SET_WALLET_ADDRESS',
    payload: {
      currency,
      address
    }
  };
}
