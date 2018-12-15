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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Hidden from '@material-ui/core/Hidden';

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
    wordBreak: 'break-word',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  fieldsetWithdrawal: {
    marginTop: 10,
    textAlign: 'center'
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
  },
  btn: {
    width: 'calc(100% - 20px)',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  withdrawalAmount: {
    width: '100%'
  },
  caption: {
    width: 'calc(100% - 20px)',
    position: 'relative'
  },
  allActionText: {
    padding: 10
  },
  mobileTabs: {
    background: '#FAFAFA'
  },
  qrCode: {
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: '100% !important'
    }
  }
});

class WalletsPage extends Component {
  render() {
    const { classes, location, activeBalance, balances, user } = this.props;

    const activeBalanceData = balances.find(({currency}) => currency === activeBalance) || {
      balance: 0,
      locked: 0
    };

    const activeBalanceName = currencyData[activeBalance] && currencyData[activeBalance].name || 'Etherium';

    const tabClasses = {
      wrapper: classes.tabWrapper,
      labelContainer: classes.verticalMiddle,
      labelIcon: classes.labelIcon
    };

    return (
      <div style={{width: '100%', display: activeBalance ? 'block' : 'none'}}>
        {!user.email && <Redirect to="/" />}

        <Hidden xsDown implementation="css">
          <Typography
            variant="h4"
            classes={{
              h4: classes.currencyName
            }}
            gutterBottom
          >
            {activeBalanceName}
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
              '/wallets/withdrawal',
              '/wallets/history'
            ].indexOf(location.pathname), 0)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Deposit"
              classes={tabClasses}
              component={Link}
              to={{pathname: '/wallets/deposit', search: location.search}}
              icon={<VerticalAlignTopIcon className={classes.verticalMiddle} />}
            />
            <Tab
              label="Withdrawal"
              classes={tabClasses}
              component={Link}
              to={{pathname: '/wallets/withdrawal', search: location.search}}
              icon={<VerticalAlignBottomIcon className={classes.verticalMiddle} />}
            />
            <Tab
              label="History"
              classes={tabClasses}
              component={Link}
              to={{pathname: '/wallets/history', search: location.search}}
              icon={<HistoryIcon className={classes.verticalMiddle} />}
            />
          </Tabs>
        </Hidden>
        <Hidden smUp implementation="css">
          <Tabs
            value={Math.max([
              '/wallets/deposit',
              '/wallets/withdrawal'
            ].indexOf(location.pathname), 0)}
            indicatorColor="primary"
            textColor="primary"
            classes={{root: classes.mobileTabs}}
            fullWidth
          >
            <Tab
              label="Deposit"
              // classes={tabClasses}
              component={Link}
              to={{pathname: '/wallets/deposit', search: location.search}}
            />
            <Tab
              label="Withdrawal"
              // classes={tabClasses}
              component={Link}
              to={{pathname: '/wallets/withdrawal', search: location.search}}
            />
          </Tabs>
        </Hidden>
        <Divider />
        <div className={classes.inner}>
          {(() => {
            const container = {
              '/wallets/deposit': (
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={3} className={classes.depositContainer}>
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
                    <Button variant="contained" color="primary" size="small" className={classes.btn}>
                      Copy
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div style={{marginTop: 10}}>
                      <QRCode fgColor="#333333" size={200} className={classes.qrCode} value='08c6a51dde006e64aed953b94fd68f0c' />
                    </div>
                  </Grid>
                </Grid>
              ),
              '/wallets/withdrawal': (
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={5} className={classes.depositContainer}>
                    <fieldset className={`${classes.fieldset} ${classes.fieldsetWithdrawal}`}>
                      <legend className={classes.legend}>{activeBalanceName} wallet adress</legend>
                      08c6a51dde006e64aed953b94fd68f0c
                    </fieldset>
                    <TextField
                      label="Withdrawal amount"
                      className={classes.withdrawalAmount}
                      name="amount"
                      margin="normal"
                      variant="outlined"
                    />
                    <Typography
                      variant="caption"
                      // paragraph={true}
                      classes={{caption: classes.caption}}
                      gutterBottom
                    >
                      <span style={{width: '50%', display: 'inline-block'}}>Fee</span>
                      <span style={{textAlign: 'right', width: '50%', display: 'inline-block'}}>1.004 {(activeBalance || 'etc').toUpperCase()}</span>
                    </Typography>
                    <Typography
                      variant="caption"
                      // paragraph={true}
                      classes={{caption: classes.caption}}
                      gutterBottom
                    >
                      <span style={{width: '50%', display: 'inline-block'}}>Total Withdraw Amount</span>
                      <span style={{textAlign: 'right', width: '50%', display: 'inline-block'}}>1.004 {(activeBalance || 'etc').toUpperCase()}</span>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.btn}
                      style={{marginTop: 10}}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              ),
              '/wallets/history': (
                <>
                  <Typography
                    variant="h3"
                    classes={{h3: classes.allActionText}}
                    gutterBottom
                  >All actions</Typography>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Action</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell numeric>Fee</TableCell>
                        <TableCell numeric>Amount</TableCell>
                        <TableCell numeric>Balance</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <VerticalAlignTopIcon className={classes.verticalMiddle} /> Deposit
                        </TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell numeric>0.2544</TableCell>
                        <TableCell numeric>0.2544</TableCell>
                        <TableCell numeric>0.2544</TableCell>
                        <TableCell>01 Jul 2018</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={10}
                    rowsPerPage={10}
                    page={10}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </>
              )
            };

            return location.pathname in container
              ? container[location.pathname]
              : container['/wallets/deposit'];
          })()}
        </div>
      </div>
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
