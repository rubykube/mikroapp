import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import Hidden from '@material-ui/core/Hidden';
import Deposit from '../../containers/WalletsPage/Deposit';
import Withdraw from '../../containers/WalletsPage/Withdraw';
import { currencyData, toMinFixed } from '../../utils/index';

import styles from './styles';

const WalletView = ({ classes, location, activeWallet, wallets }) => {
  const activeWalletData = wallets[activeWallet] || { balance: 0, locked: 0 };

  // TODO: Get rid of default name "Ethereum" in preference of something like "not found" or error msg
  const activeWalletName = currencyData[activeWallet] && currencyData[activeWallet].name || 'Ethereum'; // eslint-disable-line

  const tabClasses = {
    wrapper: classes.tabWrapper,
    labelContainer: classes.verticalMiddle,
    labelIcon: classes.labelIcon
  };

  return (
    <>
      <main className={classes.content}>
        <Hidden xsDown implementation="css">
          <div style={{display: activeWallet ? 'none' : 'block'}}>
            <Typography variant="h5" style={{padding: 40}}>Please select a wallet</Typography>
          </div>
        </Hidden>
        <div style={{width: '100%', display: activeWallet ? 'block' : 'none'}}>
          <Hidden xsDown implementation="css">
            <Typography
              variant="h4"
              classes={{ h4: classes.currencyName }}
              gutterBottom
            >
              {activeWalletName}
              <Typography
                variant="alignRight"
                classes={{ alignRight: classes.totalBalance }}
                gutterBottom
              >Total Balance: <b>{toMinFixed(activeWalletData.balance, 2)}</b></Typography>
              <Typography
                variant="alignRight"
                classes={{ alignRight: classes.locked }}
                gutterBottom
              >Locked: {toMinFixed(activeWalletData.locked, 2)}</Typography>
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
            <Switch>
              <Route path={'/wallets/deposit'} exact component={Deposit} />
              <Route path={'/wallets/withdrawal'} component={Withdraw} />
            </Switch>
          </div>
        </div>
      </main>
    </>
  );
};

export default compose(withStyles(styles))(WalletView);
