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

const styles = theme => ({
  currencyName: {
    paddingTop: 10,
    paddingLeft: 20,
    position: 'relative'
  },
  totalBalance: {
    fontSize: '10pt',
    paddingLeft: 20
  },
  locked: {
    fontSize: '10pt',
    paddingLeft: 20
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
