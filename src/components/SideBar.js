import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import {currencyData} from '../utils';

const styles = theme => ({
  drawer: {
    width: 400,
    flexShrink: 0,
  },
  drawerPaper: {
    minWidth: 400,
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
    filter: 'invert(1) brightness(0.5) sepia(1) hue-rotate(180deg) saturate(6)'
  }
});

class SideBar extends Component {
  render() {
    const { classes, balancesData, activeBalance } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {balancesData.map(({currency, balance}) => (
            <ListItem
              button
              key={currency}
              alignItems="flex-start"
              onClick={() => this.props.setActiveBalance(currency)}
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
                primary={currencyData[currency] && currencyData[currency].name || 'no name'}
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
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideBar);
