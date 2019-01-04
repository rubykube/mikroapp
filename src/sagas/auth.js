import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/auth';
import * as userActions from '../actions/account';
import * as types from '../constants/actions';
import { push } from 'connected-react-router';
import { logoutUser, loginUser } from '../api/auth';


export function* fetchLogout() {
  try {
    yield call(logoutUser);
    sessionStorage.clear();
    yield put(userActions.successLogout());
  } catch (e) {
    yield put(actions.failLogout('Oups! Error occurs, please try again later.'));
  }
}

export function* fetchLogoutSaga() {
  yield takeEvery(types.FETCH_LOGOUT, fetchLogout);
}


export function* fetchLogin({ payload: { email, password } }) {
  try {
    yield call(loginUser, email, password);
    yield put(push('/wallets'));
  } catch (e) {
    yield put(actions.failLogin('Oups! Error occurs, please try again later.'));
  }
}

export function* fetchLoginSaga() {
  yield takeEvery(types.FETCH_LOGIN, fetchLogin);
}
