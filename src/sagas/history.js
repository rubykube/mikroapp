import { call, put, takeEvery, select } from 'redux-saga/effects';
import moment from 'moment';
import * as actions from '../actions/history';
import * as types from '../constants/actions';
import { getHistory } from '../api/history';


// Saga get history according to type
export function* fetchHistory({ payload: { historyType } }) {
  try {
    const id = yield select(state => state.wallet.activeWallet);
    const history = yield call(getHistory, historyType, id);
    history.forEach(item => {
      item.created_at = moment.utc(item.created_at).format('DD MMM YYYY');
    });
    yield put(actions.successHistory(historyType, history));
  } catch (e) {
    yield put(actions.failHistory(historyType));
  }
}

export function* fetchHistorySaga() {
  yield takeEvery(types.FETCH_HISTORY, fetchHistory);
}