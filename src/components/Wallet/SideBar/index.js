import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { host } from '../../../config';
import actions from '../../../actions/index';
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {currencyData} from "../../../utils/index";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Drawer from "@material-ui/core/Drawer/Drawer";
import styles from './styles';

class SideBar extends Component {
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

  fetchWalletAdress(currency) {
    fetch(`${host}/api/v2/peatio/account/deposit_address/${currency}`)
      .then(res => res.json())
      .then(data => {
        this.props.actions.setWalletAddress(data);
      });
  }

  render() {
    const { classes, balances, walletAddresses, activeBalance, actions } = this.props;

    if (balances.length === 0) return null;

    const drawerContent = (
      <List>
        {balances.map(({currency, balance}) => (
          <ListItem
            button
            key={currency}
            alignItems="flex-start"
            onClick={() => {
              actions.setActiveBalance(currency);

              if (activeBalance && walletAddresses[activeBalance] === undefined) {
                this.fetchWalletAdress(activeBalance);
              }
            }}
            selected={currency === activeBalance}
            className={classes.listItem}
          >
            <ListItemAvatar>
              <Avatar
                alt={currency}
                src={currencyData[currency] ? currencyData[currency].icon : ''}
                className={currency === activeBalance && classes.selectedIcon}
              />
            </ListItemAvatar>
            <ListItemText
              primary={currencyData[currency] && currencyData[currency].name || 'no name'} // eslint-disable-line
              classes={{primary: currency === activeBalance && classes.selectedText}}
              secondary={
                <>
                  <Typography component="span" className={currency === activeBalance && classes.selectedText} color="textPrimary">
                    Balance: {balance}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    );

    return (
      <>
        <Hidden smUp implementation="js">
          <div style={{width: '100%', display: activeBalance ? 'none' : 'block'}}>
            {drawerContent}
          </div>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            {drawerContent}
          </Drawer>
        </Hidden>
      </>
    );
  }
}

export default compose(
  connect(state => ({
    balances: state.balances.list,
    activeBalance: state.balances.activeBalance,
    walletAddresses: state.balances.addresses,
  }), actions),
  withRouter,
  withStyles(styles)
)(SideBar);
