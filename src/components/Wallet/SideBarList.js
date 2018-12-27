import React from 'react';
import cx from 'classnames';
import compose from 'recompose/compose';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import sidebarStyles from './sidebar.styles';
import { toMinFixed } from '../../utils/index';


const SideBar = ({ classes, wallets, activeWallet, onClickWallet }) => {
  // TODO: Get rid of multiple "currency === activeWallet && "
  return (
    <List>
      {Object.entries(wallets).map(([currency, data]) => (
        <ListItem
          button
          key={currency}
          alignItems="flex-start"
          onClick={onClickWallet(currency, data)}
          selected={currency === activeWallet}
          className={cx(classes.listItem, currency === activeWallet && classes.selectedListItem)}
        >
          <ListItemAvatar>
            <Avatar
              alt={currency}
              src={data.icon_url}
              className={currency === activeWallet && classes.selectedIcon}
            />
          </ListItemAvatar>
          <Grid container classes={{container: classes.textContainer}}>
            <Grid item xs={6}>
              <ListItemText
                primary={currency.toUpperCase()}
                classes={{primary: cx(
                  classes.titleText,
                  currency === activeWallet && classes.selectedText
                )}}
                secondary={
                  <Typography
                    component="span"
                    className={currency === activeWallet && classes.selectedText}
                    color="textPrimary"
                  >
                    {data.name || 'no name'}
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <ListItemText
                primary={`${toMinFixed(data.balance, 5)} ${currency.toUpperCase()}`}
                classes={{primary: classes.balanceText}}
                secondary={
                  <Typography
                    component="span"
                    className={classes.lockedText}
                    color="textPrimary"
                  >
                    <img
                      src={require('../../assets/lock.svg')}
                      className={classes.lockedIcon}
                    />{toMinFixed(data.locked, 5)}
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};


export default compose(withStyles(sidebarStyles))(SideBar);
