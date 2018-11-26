import React, { Component } from 'react';
import NavBar from './components/NavBar';
import AccountList from './components/AccountList';
import Login  from './containers/Login';
import './App.css';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            currentUser: {},
            loading: true,
        };
    }

    fetchCurrentUser () {
        return fetch(`http://www.app.local/api/v2/barong/resource/users/me`, {
            credentials: "same-origin",
            headers: { "Accept": "application/json" },
        }).then(res => {
            if (res.ok) { return res.json() }
            throw new Error("Unauthorized!")
        })
    }

    componentDidMount () {
        this.fetchCurrentUser().then(data => {
            console.log(data)

            this.setState({
                currentUser: data,
                loading: false,
            })
        }).catch(err => {
            console.log(err)

            this.setState({
                currentUser: {},
                loading: false
            })
        })
    }

    render() {
        const { currentUser, loading } = this.state;

        return (
            <div>
                <NavBar user={currentUser} />

                {(!loading && currentUser) && (
                    currentUser.email ? <AccountList user={currentUser} /> : <Login />
                )}
            </div>
        );
    }
}

export default App;
