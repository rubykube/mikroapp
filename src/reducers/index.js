import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import walletReducer from './walletReducer';
import accountReducer from './accountReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  wallet: walletReducer,
  account: accountReducer,
  history: historyReducer,
  router: connectRouter(history)
});
