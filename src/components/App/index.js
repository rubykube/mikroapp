import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { host } from '../../config';
import NavBar from '../common/NavBar/index';
import Login from '../Login/index';
import Typography from '@material-ui/core/Typography';
import WalletsPage from '../Wallet/WalletsPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { store } from '../../store';
import { history } from '../../history';
import './styles.css';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F44336'
    },
    secondary: {
      main: '#fff'
    },
    action: {
      selected: '#4696ec1f'
    }
  },
});

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar
});

/**
 * `Index` component is a container for things like _redux Provider_, _react-router's Router_
 */
class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchCurrentUser().then((data) => {
      console.log(data);

      this.setState({
        currentUser: data,
        loading: false,
      });
    }).catch((err) => {
      console.log(err);

      this.setState({
        currentUser: {},
        loading: false,
      });
    });
  }

  fetchCurrentUser() {
    return fetch(`${host}/api/v2/barong/resource/users/me`, {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }).then((res) => {
      if (res.ok) { return res.json(); }
      throw new Error('Unauthorized!');
    });
  }

  render() {
    const { classes } = this.props;
    const { currentUser, loading } = this.state;

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <ConnectedRouter history={history}>
            <div>
              <NavBar user={currentUser} />
              <div className={classes.toolbar} />
              <div className={classes.root}>
                <CssBaseline />
                <Route
                  path="/"
                  exact
                  render={() => (
                    (!loading && currentUser) && (
                      currentUser.email ? (
                        <Typography variant="h4" style={{padding: 40}}>You are logged in!</Typography>
                      ) : <Login />
                    )
                  )}
                />
                <Route
                  path="/trade"
                  exact
                  render={() => (
                    <Typography variant="h4" style={{padding: 40}}>Trades coming soon!</Typography>
                  )}
                />
                <Route
                  path="/wallets"
                  render={() => <WalletsPage user={currentUser} />}
                />
              </div>
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(Index);
