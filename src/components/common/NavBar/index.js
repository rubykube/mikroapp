import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import Hidden from '@material-ui/core/Hidden';
import styles from './styles';
import { host } from '../../../config';
import { currencyData, getMatch } from '../../../utils/index';


class Index extends Component {
  state = {
    anchorEl: null
  };

  handleMenuClick = event => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, menuAnchorEl: null });
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

  goBack = () => {
    const {history, location} = this.props;

    if (location.search.length > 0) {
      history.push({
        ...location,
        pathname: location.pathname.slice(0, location.pathname.lastIndexOf('/')),
        search: ''
      });
    }
  }

  render() {
    const {classes, location, user, activeBalance} = this.props;
    const {anchorEl, menuAnchorEl} = this.state;

    const menuButton = (
      <IconButton
        color="inherit"
        aria-label="Menu"
        aria-owns={menuAnchorEl ? 'nav-menu' : undefined}
        aria-haspopup="true"
        onClick={this.handleMenuClick}
      >
        <MenuIcon />
      </IconButton>
    );

    // const activeBalanceName = currencyData[activeBalance] && currencyData[activeBalance].name || 'Etherium';

    return (
      <div>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            {/* <img src={require('../assets/logo.png')} height={50} /> */}

            <Hidden smUp implementation="css">
              {
                (location.pathname.indexOf('/wallet') >= 0) && activeBalance ? (
                  <IconButton
                    color="inherit"
                    onClick={this.goBack}
                  >
                    <BackIcon />
                  </IconButton>
                ) : menuButton
              }
            </Hidden>
            <Hidden xsDown implementation="css">
              {menuButton}
            </Hidden>
            <Hidden smUp implementation="css">
              <Typography variant="h6" color="inherit">
                {getMatch({
                  '/wallets': activeBalance ? (
                    currencyData && currencyData[activeBalance] && currencyData[activeBalance].name || 'Etherium' // eslint-disable-line
                  ) : 'Wallets'
                }, location.pathname, true)}
              </Typography>
            </Hidden>
            <div className={classes.grow} />
            <Hidden xsDown implementation="js">
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
                      aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      classes={{root: classes.avatar}}
                    >
                      <PersonIcon />
                    </Avatar>
                  </>
                ) : null
              }
            </Hidden>
          </Toolbar>
          <Menu
            id="nav-menu"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={this.handleClose}
          >
            <Link to="/trade"><MenuItem>TRADE</MenuItem></Link>
            <Link to="/wallets"><MenuItem>WALLETS</MenuItem></Link>
          </Menu>
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
  withStyles(styles),
  connect(state => ({
    // balances: state.balances.list,
    activeBalance: state.balances.activeBalance
  })),
)(Index);
