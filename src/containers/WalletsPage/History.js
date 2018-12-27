import React, { Component } from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import styles from '../../components/WalletsPage/styles';
import actions from '../../actions/index';
import HistoryView from '../../components/WalletsPage/History';

class History extends Component {
  componentDidMount() {
    const currentType = this.props.location.pathname.includes('withdrawal') ? 'withdraws' : 'deposits';
    this.props.actions.fetchHistory(currentType);
  }

  filterHistory = list => list.filter(item => item.currency === this.props.activeWallet);

  render() {
    const { location: { pathname }, depositHistory, withdrawHistory } = this.props;
    const history = pathname.includes('withdrawal') ? withdrawHistory : depositHistory;

    return <HistoryView history={this.filterHistory(history)}/>;
  }
}

export default compose(
  connect(state => ({
    activeWallet: state.wallet.activeWallet,
    depositHistory: state.history.deposits,
    withdrawHistory: state.history.withdraws
  }), actions),
  withStyles(styles),
  withRouter,
)(History);
