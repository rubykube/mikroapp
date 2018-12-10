import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import HistoryIcon from '@material-ui/icons/History';

import { currencyData, toMinFixed } from '../../utils';

const styles = theme => ({
  currencyName: {
    paddingTop: 10,
    paddingLeft: 20,
    position: 'relative'
  },
  totalBalance: {
    fontSize: '10pt',
    position: 'absolute',
    right: 10,
    top: 15
  },
  locked: {
    fontSize: '10pt',
    position: 'absolute',
    right: 10,
    bottom: -5
  },
  inner: {
    padding: 20
  },
  fieldset: {
    width: 300,
    border: '2px solid gray',
    borderRadius: 5,
    color: 'gray',
    margin: '20px 0'
  },
  legend: {
    fontSize: '9pt',
    color: 'gray'
  }
});

class WalletsPage extends Component {
  render() {
    const { classes, activeBalance, balances } = this.props;

    const activeBalanceData = balances.find(({currency}) => currency === activeBalance) || {
      balance: 0,
      locked: 0
    };

    console.log(activeBalanceData);

    return (
      <>
        <Typography
          variant="h4"
          classes={{
            h4: classes.currencyName
          }}
          gutterBottom
        >
          {currencyData[activeBalance] && currencyData[activeBalance].name || 'Etherium'}
          <Typography
            variant="alignRight"
            classes={{
              alignRight: classes.totalBalance
            }}
            // classes={{h4: classes.currencyName}}
            gutterBottom
          >Total Balance: <b>{toMinFixed(activeBalanceData.balance, 2)}</b></Typography>
          <Typography
            variant="alignRight"
            classes={{
              alignRight: classes.locked
            }}
            gutterBottom
          >Locked: {toMinFixed(activeBalanceData.locked, 2)}</Typography>
        </Typography>
        <Divider />
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab label="Deposit" />
          <Tab label="Withdraw" />
          <Tab label="History" icon={<HistoryIcon />} />
        </Tabs>
        <Divider />
        <div className={classes.inner}>
          <Typography
            variant="paragraph"
            gutterBottom
          >
            Please submit a deposit payment<br />
            using one of the following options<br />
            Your deposit will be reflected in your<br />
            account after the confirmation
          </Typography>
          <fieldset className={classes.fieldset}>
            <legend className={classes.legend}>Deposit by wallet adress</legend>
            08c6a51dde006e64aed953b94fd68f0c
          </fieldset>
        </div>
      </>
    );
  }
}

export default compose(
  connect(state => ({
    balances: state.balances.list,
    activeBalance: state.balances.activeBalance
  })),
  withStyles(styles)
)(WalletsPage);
