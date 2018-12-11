import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { host } from './config';
import NavBar from './components/NavBar';
import SideBarContainer from './containers/SideBarContainer';
import AccountList from './components/AccountList';
import Login from './containers/Login';
import WalletsPage from './containers/pages/WalletsPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { store } from './store';
import { history } from './history';
import './App.css';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3'
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
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
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
            <div className={classes.root}>
              <CssBaseline />
              <NavBar user={currentUser} />
              <div className={classes.toolbar} />
              <SideBarContainer />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route
                  path="/"
                  exact
                  render={() => (
                    (!loading && currentUser) && (
                      currentUser.email ? <AccountList user={currentUser} /> : <Login />
                    )
                  )}
                />
                <Route
                  path="/wallets"
                  render={() => <WalletsPage user={currentUser} />}
                />
              </main>
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
