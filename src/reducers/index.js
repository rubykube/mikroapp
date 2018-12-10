import { combineReducers } from 'redux';
import balancesReducer from './balancesReducer';

export default combineReducers({
  balances: balancesReducer
});
