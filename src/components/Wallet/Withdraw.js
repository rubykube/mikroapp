import React, { Component }  from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  fieldsetWithdrawal: {
    marginTop: 10,
    textAlign: 'center'
  },
  depositContainer: {
    position: 'relative'
  },
  btn: {
    width: 'calc(100%)',
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
  }
});



class Withdraw extends Component {
  onClick = () => this.props.onClick();

  onChange = field => e => {
    if (field === 'amount' && !/^(\s*|\d+)$/.test(e.target.value.trim())) {
      return null;
    }
    this.props.onChange(field, e.target.value.trim());
  };

  render() {
    const { classes, currency, rid, amount, otp, submitting } = this.props;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={5} className={classes.depositContainer}>
          <TextField
            label={`${currency.name} withdrawal address`}
            className={classes.withdrawalAmount}
            margin="normal"
            variant="outlined"
            onChange={this.onChange('rid')}
            value={rid}
          />
          <TextField
            label="Withdrawal amount"
            className={classes.withdrawalAmount}
            margin="normal"
            variant="outlined"
            onChange={this.onChange('amount')}
            value={amount}
          />
          <TextField
            label="OTP code"
            className={classes.withdrawalAmount}
            margin="normal"
            variant="outlined"
            onChange={this.onChange('otp')}
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
            onClick={this.onClick}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}><div style={{height: 20}}/></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Withdraw);
