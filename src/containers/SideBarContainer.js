import React, { Component } from 'react';
// import { compose } from 'react-compose';
import { connect } from 'react-redux';
import { host } from '../config';
import actions from '../actions';
import SideBar from '../components/SideBar.js';

class SideBarContiner extends Component {
  componentDidMount() {
    // TODO: Move all fetch requests to redux-saga
    fetch(`${host}/api/v2/peatio/account/balances`, {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }).then((res) => {
      if (res.ok) { return res.json(); }
      throw new Error('Unauthorized!');
    }).then(data => {
      this.props.actions.setBalances(data);
    });

    fetch(`${host}/api/v2/peatio/account/deposits`, {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }).then((res) => {
      if (res.ok) { return res.json(); }
      throw new Error('Unauthorized!');
    }).then(data => {
      this.props.actions.setDepositsHistory(data);
    });

    fetch(`${host}/api/v2/peatio/account/withdraws`, {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }).then((res) => {
      if (res.ok) { return res.json(); }
      throw new Error('Unauthorized!');
    }).then(data => {
      this.props.actions.setWithdrawsHistory(data);
    });
  }

  render() {
    if (this.props.balances.length === 0) return null;

    return <SideBar
      balancesData={this.props.balances}
      activeBalance={this.props.activeBalance}
      setActiveBalance={this.props.actions.setActiveBalance}
    />;
  }
}

export default connect(state => ({
  balances: state.balances.list,
  activeBalance: state.balances.activeBalance,
}), actions)(SideBarContiner);
