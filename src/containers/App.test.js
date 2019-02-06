import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { history } from '../history';

import WalletPage from './WalletPage';
import TradePage from './TradePage';
import LoginPage from './LoginPage';
import PrivateRoute from '../components/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';

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

it('renders without crashing', () => {
  const div = document.createElement('div');
  const isAuthenticated = false;
  const isFetching = false;
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={muiTheme}>
          <Switch>
            <Redirect exact from='/' to='/wallets' />
            <Route exact path="/login" component={LoginPage}/>
            <PrivateRoute path="/wallets" component={WalletPage} isAuthenticated={isAuthenticated} isLoading={isFetching}/>
            <PrivateRoute path="/trade" component={TradePage} isAuthenticated={isAuthenticated} isLoading={isFetching}/>
          </Switch>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div)
});
