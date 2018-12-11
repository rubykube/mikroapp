import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import HistoryIcon from '@material-ui/icons/History';
import Grid from '@material-ui/core/Grid';

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
    border: '2px solid gray',
    borderRadius: 5,
    color: 'gray',
    margin: '20px 0',
    marginTop: 50,
    width: 'calc(100% - 20px)',
    wordBreak: 'break-word'
  },
  depositContainer: {
    position: 'relative'
  },
  legend: {
    fontSize: '9pt',
    color: 'gray'
  },
  description: {
    fontSize: '10pt',
    color: '#666666'
  },
  tabWrapper: {
    display: 'inline',
  },
  verticalMiddle: {
    verticalAlign: 'middle'
  },
  labelIcon: {
    paddingTop: 0,
    minHeight: 60
  }
});

class WalletsPage extends Component {
  render() {
    const { classes, location, activeBalance, balances, user } = this.props;

    const activeBalanceData = balances.find(({currency}) => currency === activeBalance) || {
      balance: 0,
      locked: 0
    };

    const tabClasses = {
      wrapper: classes.tabWrapper,
      labelContainer: classes.verticalMiddle,
      labelIcon: classes.labelIcon
    };

    return (
      <>
        {!user.email && <Redirect to="/" />}
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
          value={Math.max([
            '/wallets/deposit',
            '/wallets/withdraw',
            '/wallets/history'
          ].indexOf(location.pathname), 0)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Deposit"
            classes={tabClasses}
            component={Link}
            to="/wallets/deposit"
            icon={<VerticalAlignTopIcon className={classes.verticalMiddle} />}
          />
          <Tab
            label="Withdrawal"
            classes={tabClasses}
            component={Link}
            to="/wallets/withdraw"
            icon={<VerticalAlignBottomIcon className={classes.verticalMiddle} />}
          />
          <Tab
            label="History"
            classes={tabClasses}
            component={Link}
            to="/wallets/history"
            icon={<HistoryIcon className={classes.verticalMiddle} />}
          />
        </Tabs>
        <Divider />
        <div className={classes.inner}>
          <Grid container spacing={0}>
            <Grid item xs={3} className={classes.depositContainer}>
              <Typography
                variant="paragraph"
                paragraph={true}
                classes={{paragraph: classes.description}}
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
            </Grid>
            <Grid item xs={9}>
              <QRCode fgColor="#333333" size={200} value='08c6a51dde006e64aed953b94fd68f0c' />
            </Grid>
          </Grid>
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
  withRouter,
  withStyles(styles)
)(WalletsPage);
