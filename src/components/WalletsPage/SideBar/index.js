import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import SideBarList from './SideBarList';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Drawer from '@material-ui/core/Drawer/Drawer';
import styles from './styles';

class SideBar extends Component {
  onClickWallet = (id, data) => () => {
    this.props.setActiveWallet(id);
    if (!data.address) {
      this.props.fetchWalletAddress(id);
    }
  };

  render() {
    const { classes, wallets, activeWallet } = this.props;

    return (// TODO resolve twice api call
      <>
        <Hidden smUp implementation="js">
          <div style={{width: '100%', display: activeWallet ? 'none' : 'block'}}>
            <SideBarList
              wallets={wallets}
              onClickWallet={this.onClickWallet}
            />
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
            <SideBarList
              wallets={wallets}
              activeWallet={activeWallet}
              onClickWallet={this.onClickWallet}
            />
          </Drawer>
        </Hidden>
      </>
    );
  }
}

export default withStyles(styles)(SideBar);
