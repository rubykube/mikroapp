import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  tabsFlexContainer: {
    height: 64,
  },
  avatar: {
    margin: '0 20px'
  },
  grow: {
    flexGrow: 1
  }
});

class NavBar extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;

    return (
      <div>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit">
              MikroApp
            </Typography>
            <div className={classes.grow} />
            <Tabs value={1} classes={{flexContainer: classes.tabsFlexContainer}}>
              <Tab label="TRADE" />
              <Tab label="WALLETS" />
            </Tabs>
            <Avatar
              src="https://material-ui.com/static/images/avatar/1.jpg"
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              classes={{root: classes.avatar}}
            />
          </Toolbar>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
