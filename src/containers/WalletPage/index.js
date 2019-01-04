import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import SideBar from '../../components/Wallet/Sidebar';
import WalletLayout from '../../components/Wallet/WalletLayout';
import Deposit from '../../components/Wallet/Deposit';
import Withdraw from '../../components/Wallet/Withdraw';
import History from '../../components/Wallet/History';
import Layout from '../Layout';
import { fetchWalletData, fetchWalletAddress, setActiveWallet } from '../../actions/wallet';
import { fetchHistory } from '../../actions/history';
import { handleChangeWithdraw, fetchSubmitWithdraw } from '../../actions/withdraw';

class WalletPage extends Component {
  componentDidMount() {
    this.props.fetchWalletData();
    this.props.fetchHistory();
  }

  //FIXME: query the correct history
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

    return (
      <Layout>
        <SideBar
          wallets={wallets}
          activeWallet={activeWallet}
          setActiveWallet={setActiveWallet}
          fetchWalletAddress={fetchWalletAddress}
        />
        <WalletLayout location={location} activeWallet={activeWallet} wallets={wallets}>
          <Switch>
            <Route
              path="/wallets/deposit"
              render={() => (
                <div>
                  <Deposit wallet={wallets[activeWallet]} />
                  <History history={this.filterHistory(depositHistory)} />
                </div>
              )}
            />
            <Route
              path="/wallets/withdrawal"
              render={() => (
                <div>
                  <Withdraw
                    currency={wallets[activeWallet]}
                    onChange={handleChangeWithdraw}
                    rid={rid}
                    amount={amount}
                    otp={otp}
                    submitting={withdrawIsFetching}
                    onClick={fetchSubmitWithdraw}
                  />
                  <History history={this.filterHistory(withdrawHistory)} />
                </div>
              )}
            />
          </Switch>
        </WalletLayout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet,
    depositHistory: state.history.deposits,
    withdrawHistory: state.history.withdraws,
    rid: state.withdraw.rid,
    amount: state.withdraw.amount,
    otp: state.withdraw.otp,
    withdrawIsFetching: state.withdraw.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWalletData: () => dispatch(fetchWalletData()),
    setActiveWallet: id => dispatch(setActiveWallet(id)),
    fetchWalletAddress: id => dispatch(fetchWalletAddress(id)),
    fetchHistory: () => dispatch(fetchHistory()),
    fetchSubmitWithdraw: () => dispatch(fetchSubmitWithdraw()),
    handleChangeWithdraw: (field, value) => dispatch(handleChangeWithdraw(field, value))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(WalletPage);
