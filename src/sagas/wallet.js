import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions/wallet';
import * as types from '../constants/actions';
import { getWalletData, getWalletAddress } from '../api/wallet';
import { push } from 'connected-react-router';
import { fetchHistory } from '../actions/history';

// Saga sets available wallets
function* fetchWallet() {
  try {
    const [balances, currencies] = yield call(getWalletData);

    const walletData = balances.reduce((prev, {currency: id, balance, locked}) => {
      const currency = currencies.find(item => id === item.id);
      if (!currency) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...currency,
          withdraw_fee: parseFloat(currency.withdraw_fee),
          balance: +balance,
          locked: +locked,
          address: null,
        }
      };
    }, {});

    yield put(actions.successWalletData(walletData));
    yield put(actions.setActiveWallet(Object.keys(walletData)[0]));
  } catch (e) {
    yield put(actions.failWalletData());
  }
}

export function* fetchWalletSaga() {
  yield takeEvery(types.FETCH_WALLET_DATA, fetchWallet);
}

// Saga sets active wallet
function* setActiveWallet({ payload: { id } }) {
  yield put(push(`/wallets/deposit?currency=${id}`));
  const wallets = yield select(state => state.wallet.list);

  if (!wallets[id].address) {
    yield put(actions.fetchWalletAddress(id));
  }

  yield put(fetchHistory('deposits')); // deposits fetch first by default
}

export function* setActiveWalletSaga() {
  yield takeEvery(types.SET_ACTIVE_WALLET, setActiveWallet);
}

// Saga sets wallet address
function* fetchWalletAddress({ payload: { id } }) {
  const wallets = yield select(state => state.wallet.list);

  try {
    const { address } = yield call(getWalletAddress, id);
    wallets[id].address = address;

    yield put(actions.successWalletAddress(wallets));
  } catch (e) {
    wallets[id].address = null;

    yield put(actions.failWalletAddress(wallets));
  }
}

export function* fetchWalletAddressSaga() {
  yield takeEvery(types.FETCH_WALLET_ADDRESS, fetchWalletAddress);
}
