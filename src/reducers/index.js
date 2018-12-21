import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import balancesReducer from './balancesReducer';
import accountReducer from './accountReducer';

export default combineReducers({
  balances: balancesReducer,
  account: accountReducer,
  router: connectRouter(history)
});
