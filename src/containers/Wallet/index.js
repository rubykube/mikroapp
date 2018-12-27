import React, { Component } from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import SideBar from './Sidebar';
import WalletView from '../../components/Wallet'
import actions from '../../actions';

class WalletsPage extends Component {
  componentDidMount() {
    this.props.actions.fetchWalletData();
  }

  render() {
    const { location, activeWallet, wallets } = this.props;

    if (!Object.keys(wallets).length || !activeWallet) return null;

    return (
      <>
        <SideBar/>
        <WalletView location={location} activeWallet={activeWallet} wallets={wallets}/>
      </>
    );
  }
}

export default compose(
  connect(state => ({
    account: state.account.data,
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet
  }), actions),
  withRouter
)(WalletsPage);
