import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/user';
import * as types from '../constants/actions';
import { getUser } from '../api/user';


export function* fetchUser() {
  try {
    const user = yield call(getUser);
    yield put(actions.successUser(user));
  } catch (e) {
    yield put(actions.failUser());
  }
}

export function* fetchUserSaga() {
  yield takeEvery(types.FETCH_USER, fetchUser);
}
