import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/account';
import * as types from '../constants/actions';
import requestCreator from '../api';


export function* fetchAccount() {
  try {
    const account = yield call(requestCreator, 'get', '/api/v2/barong/resource/users/me');
    yield put(actions.successAccount(account));
  } catch (e) {
    yield put(actions.failAccount());
  }
}

export function* fetchAccountSaga() {
  yield takeEvery(types.FETCH_ACCOUNT, fetchAccount);
}
