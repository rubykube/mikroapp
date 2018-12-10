import { call, put, takeEvery, select } from 'redux-saga/effects';
import moment from 'moment';
import * as actions from '../actions/history';
import * as types from '../constants/actions';
import { getHistory } from '../api/history';

// Saga get history according to type
//FIXME: separate history into two saga to fetch only the needed ones
export function* fetchHistory() {
  const updateTime = list => list.forEach(item => {
    item.created_at = moment.utc(item.created_at).format('DD MMM YYYY');
  });
  try {

    const id = yield select(state => state.wallet.activeWallet);
    const [deposits, withdraws] = yield call(getHistory, id);

    updateTime(deposits);
    updateTime(withdraws);
    yield put(actions.successHistory(deposits, withdraws));
  } catch (e) {
    yield put(actions.failHistory());
  }
}

export function* fetchHistorySaga() {
  yield takeEvery(types.FETCH_HISTORY, fetchHistory);
}