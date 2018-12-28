import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import Hidden from '@material-ui/core/Hidden';
import { toMinFixed } from '../../utils/index';

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
  mobileTabs: {
    background: '#FAFAFA'
  },
  content: {
    flexGrow: 1,
    background: 'white'
    // padding: theme.spacing.unit * 3,
  }
});


const WalletLayout = ({ classes, location, activeWallet, wallets, children }) => {
  const tabClasses = {
    wrapper: classes.tabWrapper,
    labelContainer: classes.verticalMiddle,
    labelIcon: classes.labelIcon
  };

  return (
    <Fragment>
      <main className={classes.content}>
        <Hidden xsDown implementation="css">
          <div style={{display: activeWallet ? 'none' : 'block'}}>
            <Typography variant="h5" style={{padding: 40}}>Please select a wallet</Typography>
          </div>
        </Hidden>
        <div style={{width: '100%', display: activeWallet ? 'block' : 'none'}}>
          <Hidden xsDown implementation="css">
            <Typography variant="h4" classes={{ h4: classes.currencyName }} gutterBottom>
              {wallets[activeWallet].name}
              <Typography variant="alignRight" classes={{ alignRight: classes.totalBalance }} gutterBottom>
                Total Balance: <b>{toMinFixed(wallets[activeWallet].balance, 2)}</b>
              </Typography>
              <Typography variant="alignRight" classes={{ alignRight: classes.locked }} gutterBottom>
                Locked: {toMinFixed(wallets[activeWallet].locked, 2)}
              </Typography>
            </Typography>
            <Divider />
            <Tabs
              value={Math.max(['/wallets/deposit', '/wallets/withdrawal'].indexOf(location.pathname), 0)}
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
            </Tabs>
          </Hidden>
          <Hidden smUp implementation="css">
            <Tabs
              value={Math.max(['/wallets/deposit', '/wallets/withdrawal'].indexOf(location.pathname), 0)}
              indicatorColor="primary"
              textColor="primary"
              classes={{root: classes.mobileTabs}}
              fullWidth
            >
              <Tab
                label="Deposit"
                component={Link}
                to={{pathname: '/wallets/deposit', search: location.search}}
              />
              <Tab
                label="Withdrawal"
                component={Link}
                to={{pathname: '/wallets/withdrawal', search: location.search}}
              />
            </Tabs>
          </Hidden>
          <Divider />
          <div className={classes.inner}>
            {children}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default withStyles(styles)(WalletLayout);
