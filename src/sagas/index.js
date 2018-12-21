import { all } from 'redux-saga/effects';
import { fetchAccountSaga } from './account';

export default function* rootSaga() {
  yield all([
    fetchAccountSaga(),
  ]);
}