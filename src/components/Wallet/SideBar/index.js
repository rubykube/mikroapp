import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core";
import SideBarList from './SideBarList';
import Hidden from "@material-ui/core/Hidden/Hidden";
import Drawer from "@material-ui/core/Drawer/Drawer";
import styles from './styles';
import { fetchWalletAddress, setActiveWallet, fetchWalletData } from '../../../actions/wallet';


class SideBar extends Component {
  componentDidMount() {
    // fetch(`${host}/api/v2/peatio/account/deposits`, {//TODO move to history reducer
    //   credentials: 'same-origin',
    //   headers: { Accept: 'application/json' },
    // }).then((res) => {
    //   if (res.ok) { return res.json(); }
    //   throw new Error('Unauthorized!');
    // }).then(data => {
    //   this.props.actions.setDepositsHistory(data);
    // });
    //
    // fetch(`${host}/api/v2/peatio/account/withdraws`, {
    //   credentials: 'same-origin',
    //   headers: { Accept: 'application/json' },
    // }).then((res) => {
    //   if (res.ok) { return res.json(); }
    //   throw new Error('Unauthorized!');
    // }).then(data => {
    //   this.props.actions.setWithdrawsHistory(data);
    // });
    this.props.fetchWalletData();
  }

  onClickWallet = (id, data) => () => {
    this.props.setActiveWallet(id);
    if (!data.address) {
      this.props.fetchWalletAddress(id);
    }
  }

  render() {
    const { classes, wallets, activeWallet } = this.props;

    if (Object.values(wallets).length === 0) return null;

    return (// TODO resolve twice api call
      <>
        <Hidden smUp implementation="js">
          <div style={{width: '100%', display: activeWallet ? 'none' : 'block'}}>
            <SideBarList onClickWallet={this.onClickWallet}/>
          </div>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.toolbar} />
            <SideBarList onClickWallet={this.onClickWallet}/>
          </Drawer>
        </Hidden>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWalletData: () => dispatch(fetchWalletData()),
    setActiveWallet: id => dispatch(setActiveWallet(id)),
    fetchWalletAddress: id => dispatch(fetchWalletAddress(id)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(styles)
)(SideBar);
