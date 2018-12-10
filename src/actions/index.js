import { bindActionCreators } from 'redux';
import * as balancesActions from './balances';

export default dispatch => ({
  actions: bindActionCreators({
    ...balancesActions
  }, dispatch)
});
