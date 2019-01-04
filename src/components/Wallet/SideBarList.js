import React from 'react';
import cx from 'classnames';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import { toMinFixed } from '../../utils/index';

const sidebarListStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  listItem: {
    margin: '8px 14px',
    padding: '18px 20px',
    borderRadius: '4px',
    width: 'calc(100% - 28px)',
    background: '#FFFFFF',
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.12)',
    opacity: 0.6
  },
  textContainer: {
    paddingLeft: 10
  },
  balanceText: {
    textAlign: 'right',
    fontWeight: 600
  },
  lockedIcon: {
    verticalAlign: 'middle',
    height: 14,
    paddingRight: 5,
    opacity: 0.7,
    bottom: 1,
    position: 'relative'
  },
  lockedText: {
    textAlign: 'right'
  },
  titleText: {
    fontWeight: 600
  },
  selectedListItem: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    opacity: 1
  },
  selectedText: {
    // color: theme.palette.primary.main
  },
  selectedIcon: {
    // filter: 'invert(1) brightness(0.5) sepia(1.2) hue-rotate(-45deg) saturate(6)'
  },
  avatarImg: {
    width: 'auto'
  }
});

const SideBarList = ({ classes, wallets, activeWallet, onClickWallet }) => {
  return (
    <List>
      {Object.entries(wallets).map(([currency, data]) => {
        const isActive = currency === activeWallet;

        return (
          <ListItem
            button
            key={currency}
            alignItems="flex-start"
            onClick={onClickWallet(currency, data)}
            selected={isActive}
            className={cx(classes.listItem, isActive && classes.selectedListItem)}
          >
            <ListItemAvatar>
              <Avatar
                alt={currency}
                src={data.icon_url}
                className={isActive && classes.selectedIcon}
                classes={{img: classes.avatarImg}}
              />
            </ListItemAvatar>
            <Grid container classes={{container: classes.textContainer}}>
              <Grid item xs={6}>
                <ListItemText
                  primary={currency.toUpperCase()}
                  classes={{primary: cx(
                    classes.titleText,
                    isActive && classes.selectedText
                  )}}
                  secondary={
                    <Typography
                      component="span"
                      className={isActive && classes.selectedText}
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
                        alt="locked"
                        className={classes.lockedIcon}
                      />{toMinFixed(data.locked, 5)}
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
};

export default withStyles(sidebarListStyles)(SideBarList);
