import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from "recompose/compose";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import { fetchWalletAddress, setActiveWallet } from "../../../actions/wallet";
import { withStyles } from "@material-ui/core";
import styles from "./styles";


class SideBar extends Component {
  render() {
    const { classes, wallets, activeWallet, onClickWallet } = this.props;

    return (
      <List>
        {Object.entries(wallets).map(([currency, data]) => {
          return (
            <ListItem
              button
              key={currency}
              alignItems="flex-start"
              onClick={onClickWallet(currency, data)}
              selected={currency === activeWallet}
              className={classes.listItem}
            >
              <ListItemAvatar>
                <Avatar
                  alt={currency}
                  src={data.icon_url}
                  className={currency === activeWallet && classes.selectedIcon}
                />
              </ListItemAvatar>
              <ListItemText
                primary={data.name || 'no name'}
                classes={{primary: currency === activeWallet && classes.selectedText}}
                secondary={
                  <Typography
                    component="span"
                    className={currency === activeWallet && classes.selectedText}
                    color="textPrimary"
                  >
                    Balance: {data.balance}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

function mapStateToProps(state) {
  return {
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet,
  }
}
export default compose(connect(mapStateToProps), withStyles(styles))(SideBar);