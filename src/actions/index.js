import { bindActionCreators } from 'redux';
import * as accountActions from './account';
import * as walletActions from './wallet';
import * as historyActions from './history';

export default dispatch => ({
  actions: bindActionCreators({
    ...historyActions,
    ...accountActions,
    ...walletActions
  }, dispatch)
});
