import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import { host } from '../config';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0 0px 10px rgba(0, 0, 0, 0.15)'
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

  logoutUser = () => {
    fetch(`${host}/api/v2/barong/identity/sessions`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      }
    }).then(data => {
      if (data.status === 200) {
        this.props.history.push('/');
      }
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    const {classes, location, user} = this.props;
    const {anchorEl} = this.state;

    return (
      <div>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <img src={require('../assets/logo.png')} height={50} />
            <div className={classes.grow} />
            {
              user.email ? (
                <>
                  <Tabs value={location.pathname === '/trade' ? 0 : (
                    location.pathname.indexOf('/wallets') >= 0 ? 1 : undefined
                  )} classes={{
                    flexContainer: classes.tabsFlexContainer
                  }}>
                    <Tab label="TRADE" component={Link} to="/trade" />
                    <Tab label="WALLETS" component={Link} to="/wallets" />
                  </Tabs>
                  <Avatar
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    classes={{root: classes.avatar}}
                  />
                </>
              ) : null
            }
          </Toolbar>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
          </Menu>
        </AppBar>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(NavBar);
