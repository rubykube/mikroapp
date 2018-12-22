import { bindActionCreators } from 'redux';
import * as accountActions from './account';
import * as walletActions from './wallet';
import * as balancesActions from './balances';

export default dispatch => ({
  actions: bindActionCreators({
    ...balancesActions,
    ...accountActions,
    ...walletActions
  }, dispatch)
});
