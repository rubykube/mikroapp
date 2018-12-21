import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import walletReducer from './walletReducer';
import accountReducer from './accountReducer';

export default combineReducers({
  wallet: walletReducer,
  account: accountReducer,
  router: connectRouter(history)
});
