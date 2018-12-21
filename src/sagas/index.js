import { all } from 'redux-saga/effects';
import { fetchAccountSaga } from './account';
import { fetchWalletSaga, setActiveWalletSaga, fetchWalletAddressSaga } from './wallet';

export default function* rootSaga() {
  yield all([
    fetchAccountSaga(),
    fetchWalletSaga(),
    setActiveWalletSaga(),
    fetchWalletAddressSaga(),
  ]);
}