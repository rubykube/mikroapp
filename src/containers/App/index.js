import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar/index';
import Typography from '@material-ui/core/Typography';
import WalletPage from '../WalletPage';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './styles.css';
import { styles, muiTheme } from './styles';
import actions from '../../actions';


class App extends Component {
  componentDidMount() {
    this.props.actions.fetchAccount();
  }

  renderAppMessage = text => <Typography variant="h4" style={{padding: 40}}>{text}</Typography>

  render() {
    const { classes, account } = this.props;

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <NavBar user={account} />
          <div className={classes.toolbar} />
          <div className={classes.root}>
            <CssBaseline />
            <Switch>
              <Redirect exact from='/' to='/wallets' />
              <Route path="/trade" exact render={() => this.renderAppMessage('Trades coming soon!')}/>
              <Route path="/wallets" component={WalletPage}/>
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({
    isFetching: state.account.isFetching,
    error: state.account.error
  }), actions)
)(App);
