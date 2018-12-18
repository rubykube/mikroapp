import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { currencyData } from '../utils';
import { host } from '../config';
import actions from '../actions';

const styles = theme => ({
  drawer: {
    flexShrink: 0,
    width: 400
  },
  drawerPaper: {
    minWidth: 400
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    margin: '8px 14px',
    padding: '8px 10px',
    borderRadius: '4px',
    width: 'calc(100% - 28px)'
  },
  selectedText: {
    color: theme.palette.primary.main,
    fontWeight: 600
  },
  selectedIcon: {
    filter: 'invert(1) brightness(0.5) sepia(1.2) hue-rotate(-45deg) saturate(6)'
  }
});

/**
 * SideBar component
 */
class SideBar extends Component {
  static propTypes = {
    /** {Array<{currency: String, balance: Number, locked: Number}>} A list of balances */
    balancesData: PropTypes.arrayOf(
      PropTypes.shape({
        currency: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        locked: PropTypes.number.isRequired
      })
    ),
    /** {String} A currency id representing selected balance */
    activeBalance: PropTypes.string
  };

  fetchWalletAdress(currency) {
    fetch(`${host}/api/v2/peatio/account/deposit_address/${currency}`)
      .then(res => res.json())
      .then(data => {
        this.props.actions.setWalletAddress(data);
      });
  }

  render() {
    const { classes, balancesData, walletAddresses, activeBalance } = this.props;

    const drawerContent = (
      <>
        <div className={classes.toolbar} />
        <List>
          {balancesData.map(({currency, balance}) => (
            <ListItem
              button
              key={currency}
              alignItems="flex-start"
              onClick={() => {
                this.props.setActiveBalance(currency);

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
      </>
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
            {drawerContent}
          </Drawer>
        </Hidden>
      </>
    );
  }
}

export default compose(
  connect(state => ({
    walletAddresses: state.balances.addresses
  }), actions),
  withRouter,
  withStyles(styles),
)(SideBar);
