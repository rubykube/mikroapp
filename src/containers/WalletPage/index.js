import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import SideBarContainer from '../../components/Wallet/Sidebar';
import WalletLayout from '../../components/Wallet/WalletLayout'
import Deposit from '../../components/Wallet/Deposit';
import Withdraw from '../../components/Wallet/Withdraw';
import History from '../../components/Wallet/History';
import { fetchWalletData, fetchWalletAddress, setActiveWallet } from '../../actions/wallet';
import { fetchHistory } from '../../actions/history';
import { handleChangeWithdraw, fetchSubmitWithdraw } from '../../actions/withdraw';


class WalletPage extends Component {
  componentDidMount() {
    this.props.fetchWalletData();
    this.props.fetchHistory();
  }

  filterHistory = list => list.filter(item => item.currency === this.props.activeWallet);

  render() {
    const {
      location,
      activeWallet,
      wallets,
      rid,
      amount,
      otp,
      withdrawIsFetching,
      withdrawHistory,
      depositHistory,
      setActiveWallet,
      fetchWalletAddress,
      fetchSubmitWithdraw,
      handleChangeWithdraw
    } = this.props;

    if (!Object.keys(wallets).length) return null;

    const history = location.pathname.includes('withdrawal') ? withdrawHistory : depositHistory;

    return (
      <Fragment>
        <SideBarContainer
          wallets={wallets}
          activeWallet={activeWallet}
          setActiveWallet={setActiveWallet}
          fetchWalletAddress={fetchWalletAddress}
        />
        <WalletLayout location={location} activeWallet={activeWallet} wallets={wallets}>
          <Switch>
            <Route
              path="/wallets/deposit"
              render={() => <Deposit wallet={wallets[activeWallet]}/>}
            />
            <Route
              path="/wallets/withdrawal"
              render={() => (
                <Withdraw
                  currency={wallets[activeWallet]}
                  onChange={handleChangeWithdraw}
                  rid={rid}
                  amount={amount}
                  otp={otp}
                  submitting={withdrawIsFetching}
                  onClick={fetchSubmitWithdraw}
                />
              )}
            />
          </Switch>
          <History history={this.filterHistory(history)}/>
        </WalletLayout>
      </Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    account: state.account.data,
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet,
    depositHistory: state.history.deposits,
    withdrawHistory: state.history.withdraws,
    rid: state.withdraw.rid,
    amount: state.withdraw.amount,
    otp: state.withdraw.otp,
    withdrawIsFetching: state.withdraw.isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWalletData: () => dispatch(fetchWalletData()),
    setActiveWallet: id => dispatch(setActiveWallet(id)),
    fetchWalletAddress: id => dispatch(fetchWalletAddress(id)),
    fetchHistory: () => dispatch(fetchHistory()),
    fetchSubmitWithdraw: () => dispatch(fetchSubmitWithdraw()),
    handleChangeWithdraw: (field, value) => dispatch(handleChangeWithdraw(field, value))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(WalletPage);
