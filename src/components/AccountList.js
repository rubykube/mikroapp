import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';

import withStyles from '@material-ui/core/styles/withStyles';

import {host} from '../config';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    card: {
        maxWidth: 400,
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        /* alignItems: 'center', */
        /* padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`, */
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
    }
});

class AccountList extends React.Component {
    state = { accounts: [] }

    fetchAccounts () {
        return fetch(`${host}/api/v2/peatio/account/balances`, {
            headers: { 'Accept': 'application/json' },
        }).then(res => {
            if (res.status === 200) { return res.json() }
            throw new Error("Can't load accounts data")
        })
    }

    signOut () {
        fetch(`${host}/api/v2/barong/identity/sessions`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            }
        }).then(data => {
            if (data.status === 200) {
                window.location.replace('/')
            }
        }).catch(err => {
            console.error(err)
        })
    }

    componentDidMount () {
        this.fetchAccounts().then(data => {
            console.log(data)
            this.setState({ accounts: data })
        }).catch(err => {
            console.error(err)
        })
    }

    render () {
        const { classes, user } = this.props;
        const { accounts } = this.state;

        return (
            <main className={classes.main}>
                <CssBaseline />

                <Card className={classes.card}>
                    <CardHeader title={`Hi, ${user.email}`} />

                    <Divider />
                    <CardContent>
                        <Typography component="h3">User</Typography>
                        <code>
                            <pre>{JSON.stringify(user, null, 2)}</pre>
                        </code>
                    </CardContent>

                    <Divider />
                    <CardContent>
                        <Typography component="h3">Wallets</Typography>
                        <code>
                            <pre>{JSON.stringify(accounts, null, 2)}</pre>
                        </code>
                    </CardContent>

                    <Divider />
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Button variant="outlined" color="secondary" onClick={this.signOut}>Logout</Button>
                    </CardActions>
                </Card>
            </main>
        );
    }
}

AccountList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountList);
