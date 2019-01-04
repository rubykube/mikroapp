import { bindActionCreators } from 'redux';
import * as accountActions from './account';
import * as walletActions from './wallet';
import * as historyActions from './history';
import * as withdrawActions from './withdraw';
import * as authActions from './auth';

export default dispatch => ({
  actions: bindActionCreators({
    ...historyActions,
    ...accountActions,
    ...walletActions,
    ...withdrawActions,
    ...authActions,
  }, dispatch)
});
