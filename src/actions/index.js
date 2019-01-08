import { bindActionCreators } from 'redux';
import * as userActions from './user';
import * as walletActions from './wallet';
import * as historyActions from './history';
import * as withdrawActions from './withdraw';
import * as authActions from './auth';

export default dispatch => ({
  actions: bindActionCreators({
    ...historyActions,
    ...userActions,
    ...walletActions,
    ...withdrawActions,
    ...authActions,
  }, dispatch)
});
