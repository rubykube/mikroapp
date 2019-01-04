import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import walletReducer from './walletReducer';
import userReducer from './userReducer';
import historyReducer from './historyReducer';
import withdrawReducer from './withdrawReducer';
import authReducer from './authReducer';


export default combineReducers({
  wallet: walletReducer,
  user: userReducer,
  history: historyReducer,
  withdraw: withdrawReducer,
  auth: authReducer,
  router: connectRouter(history)
});
