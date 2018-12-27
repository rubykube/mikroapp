import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from "recompose/compose";
import WithdrawView from "../../components/WalletsPage/Withdraw";
import History from "./History";
import actions from '../../actions';

class Withdraw extends Component {
  onChange = field => e => {
    if (field === 'amount' && !/^(\s*|\d+)$/.test(e.target.value.trim())) {
      return null;
    }
    this.props.actions.handleChangeWithdraw(field, e.target.value.trim());
  };

  onClick = () => this.props.actions.fetchSubmitWithdraw();

  render() {
    const { wallets, activeWallet, rid, amount, otp, isFetching } = this.props;

    if (!Object.keys(wallets).length || !activeWallet) return null;

    return (
      <WithdrawView
        currency={wallets[activeWallet]}
        onChange={this.onChange}
        rid={rid}
        amount={amount}
        otp={otp}
        submitting={isFetching}
        onClick={this.onClick}
      >
        <History/>
      </WithdrawView>
    );
  }
}

export default compose(
  connect(state => ({
    rid: state.withdraw.rid,
    amount: state.withdraw.amount,
    otp: state.withdraw.otp,
    isFetching: state.withdraw.isFetching,
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet
  }), actions)
)(Withdraw);
