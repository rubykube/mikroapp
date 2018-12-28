import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const DepositView = ({ classes, address, children }) => {
  return (
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
      <Grid item xs={12} sm={9}>
        <div style={{marginTop: 10}}>
          {address && <QRCode fgColor="#333333" size={200} className={classes.qrCode} value={address} />}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{height: 20}} />
        { children }
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(styles))(DepositView);
