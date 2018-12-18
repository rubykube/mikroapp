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
  return {
    type: 'balances/SET_BALANCES',
    payload: {
      balances: balances.map(({currency, balance, locked}) => ({
        currency,
        balance: +balance, // Convert to numeric
        locked: +locked // Convert to numeric
      }))
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
