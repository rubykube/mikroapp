import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Account from '../components/Account'

class AccountList extends Component {

  state = {
    accounts: []
  }

  constructor() {
    super()
    this.getAccounts()
  }

  getAccounts = () => {
    this.state.accounts = [{currency: 'EUR'}, {currency: 'USD'}]
  }

  render() {
    return (
      <div>
      {this.state.accounts ? (
        <div>
          <Grid container spacing={24} style={{padding: 24}}>
            { this.state.accounts.map(currentAccount => (
              <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Account account={currentAccount} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : "No Accounts yet" }
      </div>
    )
  }
}

export default AccountList;
