import React from 'react'
import Button from '@material-ui/core/Button'

const Account = (props) => {
  return (
    <div>
      { props.account ? (
        <Button variant="contained" color="primary">
          {props.account.currency}
        </Button>
      ) : null }
    </div>
  )
}

export default Account;
