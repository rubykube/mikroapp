import React, { Component } from 'react';
import NavBar from './components/NavBar'
import AccountList from './components/AccountList'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AccountList />
      </div>
    );
  }
}

export default App;
