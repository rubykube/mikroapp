import React, { Component } from 'react';
import { connect } from 'react-redux';
import DepositView from "../../components/Wallet/Deposit";
import History from './History';


class Deposit extends Component {
  render() {
    const { wallets, activeWallet } = this.props;

    if (!Object.keys(wallets).length || !activeWallet) return null;

    return (
      <DepositView address={wallets[activeWallet].address}>
        <History/>
      </DepositView>
    );
  }
}

export default  connect(
  state => ({
    account: state.account.data,
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet
  }))
(Deposit);

