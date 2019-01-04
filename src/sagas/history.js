import { call, put, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';
import * as actions from '../actions/history';
import * as types from '../constants/actions';
import { DEPOSITS_HISTORY_TYPE, WITHDRAWS_HISTORY_TYPE } from '../constants/history';
import { getDepositHistory, getWithdrawHistory } from '../api/history';

function updateTime(list) {
  return list.map(item => ({
    ...item,
    created_at: moment.utc(item.created_at).format('DD MMM YYYY')
  }));
}

// Saga get history according to type
export function* fetchDepositsHistory() {
  try {
    const id = yield select(state => state.wallet.activeWallet);
    const deposits = updateTime(yield call(getDepositHistory, id));

    yield put(actions.successHistory(DEPOSITS_HISTORY_TYPE, deposits));
  } catch (e) {
    yield put(actions.failHistory());
  }
}

export function* fetchWithdrawsHistory() {
  try {
    const id = yield select(state => state.wallet.activeWallet);
    const withdraws = updateTime(yield call(getWithdrawHistory, id));

    yield put(actions.successHistory(WITHDRAWS_HISTORY_TYPE, withdraws));
  } catch (e) {
    yield put(actions.failHistory());
  }
}

export function* fetchHistorySaga() {
  yield takeLatest(types.FETCH_HISTORY, fetchDepositsHistory);
  yield takeLatest(types.FETCH_HISTORY, fetchWithdrawsHistory);
}
