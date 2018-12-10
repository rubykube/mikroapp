import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/account';
import * as types from '../constants/actions';
import { getAccount } from '../api/account';


export function* fetchAccount() {
  try {
    const account = yield call(getAccount);
    yield put(actions.successAccount(account));
  } catch (e) {
    yield put(actions.failAccount());
  }
}

export function* fetchAccountSaga() {
  yield takeEvery(types.FETCH_ACCOUNT, fetchAccount);
}
