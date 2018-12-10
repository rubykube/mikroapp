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
  toolbar: theme.mixins.toolbar
});

class SideBar extends Component {
  render() {
    const { classes, balancesData } = this.props;

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
            >
              <ListItemAvatar>
                <Avatar alt={currency} src={currencyData[currency] ? currencyData[currency].icon : ''} />
              </ListItemAvatar>
              <ListItemText
                primary={currencyData[currency] && currencyData[currency].name || 'no name'}
                secondary={
                  <>
                    <Typography component="span" className={classes.inline} color="textPrimary">
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
