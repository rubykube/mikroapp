import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import WalletPage from './WalletPage';
import TradePage from './TradePage';
import LoginPage from './LoginPage';
import actions from "../actions";
import PrivateRoute from '../components/PrivateRoute';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F44336'
    },
    secondary: {
      main: '#fff'
    },
    action: {
      selected: '#ffffff'
    }
  },
});


class App extends Component {
  componentDidMount() {
    this.props.actions.fetchUser();
  }

  render() {
    const { isFetching, user } = this.props;
    let isAuthenticated = false;
    if(user) {
      isAuthenticated = user.email && user.state === 'active';
    }

    return (
      <MuiThemeProvider theme={muiTheme}>
        <Switch>
          <Redirect exact from='/' to='/wallets' />
          <Route exact path="/login" component={LoginPage}/>
          <PrivateRoute path="/wallets" component={WalletPage} isAuthenticated={isAuthenticated} isLoading={isFetching}/>
          <PrivateRoute path="/trade" component={TradePage} isAuthenticated={isAuthenticated} isLoading={isFetching}/>
        </Switch>
      </MuiThemeProvider>
    );
  }
}


export default connect(state => ({
  user: state.user.data,
  isFetching: state.user.isFetching
}), actions)(App);
