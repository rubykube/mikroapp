import React  from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core";
import styles from "./styles";


const WithdrawView = ({ classes, children, currency, onChange, rid, amount, otp, submitting, onClick }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={5} className={classes.depositContainer}>
        <TextField
          label={`${currency.name} withdrawal address`}
          className={classes.withdrawalAmount}
          margin="normal"
          variant="outlined"
          onChange={onChange('rid')}
          value={rid}
        />
        <TextField
          label="Withdrawal amount"
          className={classes.withdrawalAmount}
          margin="normal"
          variant="outlined"
          onChange={onChange('amount')}
          value={amount}
        />
        <TextField
          label="OTP code"
          className={classes.withdrawalAmount}
          margin="normal"
          variant="outlined"
          onChange={onChange('otp')}
          value={otp}
        />
        <Typography variant="caption" classes={{caption: classes.caption}} gutterBottom>
          <span style={{width: '50%', display: 'inline-block'}}>Fee</span>
          <span style={{textAlign: 'right', width: '50%', display: 'inline-block'}}>
            {`${currency.withdraw_fee} ${currency.id.toUpperCase()}`}
          </span>
        </Typography>
        <Typography variant="caption" classes={{caption: classes.caption}} gutterBottom>
          <span style={{width: '50%', display: 'inline-block'}}>Total Withdraw Amount</span>
          <span style={{textAlign: 'right', width: '50%', display: 'inline-block'}}>
            {`${currency.withdraw_fee + +amount} ${currency.id.toUpperCase()}`}
          </span>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.btn}
          style={{marginTop: 10}}
          disabled={!rid || !amount || !otp || submitting}
          onClick={onClick}
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={12}>
        <div style={{height: 20}} />
        { children }
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(styles))(WithdrawView);
