import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import balancesReducer from './balancesReducer';

export default combineReducers({
  balances: balancesReducer,
  router: connectRouter(history)
});
