import React, { Component } from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core";
import styles from "../styles";
import actions from '../../../actions';
import History from './History';

class HistoryContainer extends Component {
  componentDidMount() {
    const currentType = this.props.location.pathname.includes('withdrawal') ? 'withdraws' : 'deposits';
    this.props.actions.fetchHistory(currentType);
  }

  render() {
    const { location: { pathname }, depositHistory, withdrawHistory } = this.props;
    const history = pathname.includes('withdrawal') ? withdrawHistory : depositHistory;

    return <History history={history}/>;
  }
}


export default compose(
  connect(state => ({
    depositHistory: state.history.deposits,
    withdrawHistory: state.history.withdraws
  }), actions),
  withStyles(styles),
  withRouter,
)(HistoryContainer);