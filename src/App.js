import React, { Component } from 'react';
import NavBar from './components/NavBar';
// import AccountList from './components/AccountList';
import Login  from './containers/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Login />
      </div>
    );
  }
}

export default App;
