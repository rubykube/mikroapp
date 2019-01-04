import { all } from 'redux-saga/effects';
import { fetchAccountSaga } from './account';
import { fetchWalletSaga, setActiveWalletSaga, fetchWalletAddressSaga } from './wallet';
import { fetchHistorySaga } from './history';
import { fetchSubmitWithdrawSaga } from './withdraw';
import { fetchLogoutSaga, fetchLoginSaga } from './auth';


export default function* rootSaga() {
  yield all([
    fetchAccountSaga(),
    fetchWalletSaga(),
    setActiveWalletSaga(),
    fetchWalletAddressSaga(),
    fetchHistorySaga(),
    fetchSubmitWithdrawSaga(),
    fetchLogoutSaga(),
    fetchLoginSaga(),
  ]);
}