import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { toMinFixed } from '../../utils/index';

const styles = theme => ({
  fieldset: {
    border: '2px solid gray',
    borderRadius: 5,
    color: 'gray',
    margin: '20px 0',
    width: 'calc(100% - 20px)',
    wordBreak: 'break-word',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  depositContainer: {
    position: 'relative'
  },
  legend: {
    fontSize: '9pt',
    color: 'gray'
  },
  description: {
    width: 'calc(100% - 20px)',
    fontSize: '14pt',
    paddingTop: 20,
    color: '#666666'
  },
  btn: {
    width: 'calc(100% - 20px)',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  qrCode: {
    margin: '10px',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: '100% !important'
    }
  }
});


const DepositView = ({ classes, wallet: { name, address, balance, locked } }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={5} className={classes.depositContainer}>
        <Typography variant="h4" classes={{ h4: classes.currencyName }} gutterBottom>
          {name}
        </Typography>
        <Typography variant="subheading" classes={{ subheading: classes.totalBalance }} gutterBottom>
          Total Balance: <b>{toMinFixed(balance, 2)}</b>,
          Locked: {toMinFixed(locked, 2)}
        </Typography>
        <Typography
          variant="paragraph"
          paragraph={true}
          classes={{paragraph: classes.description}}
          gutterBottom
        >
          Please send a payment using the generated deposit address below, Your deposit will be reflected in your account after blockchain confirmation.
        </Typography>
        <fieldset className={classes.fieldset}>
          <legend className={classes.legend}>Deposit by wallet adress</legend>
          {address || 'Not found'}
        </fieldset>
        <CopyToClipboard text={address}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.btn}
            disabled={!address}
          >
            Copy
          </Button>
        </CopyToClipboard>
      </Grid>
      <Grid item xs={12} sm={7}>
          {address && <QRCode fgColor="#333333" size={300} className={classes.qrCode} value={address} />}
      </Grid>
      <Grid item xs={12}><div style={{height: 20}} /></Grid>
    </Grid>
  );
};

export default withStyles(styles)(DepositView);
