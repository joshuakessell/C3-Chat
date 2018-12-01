import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Login from './components/login/Login.js';
import C3 from './components/login/C3.js'
import Dashboard from './components/dashboard/dashboard.js'
import axios from 'axios';


class App extends Component {
  constructor() {
    super()
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      isLoggedIn: false,
      username: null
    }
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          isLoggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          isLoggedIn: false,
          username: null
        })
      }
    })
  }

  updateUser(data) {
    this.setState(data)
  }

  render() {
    return (
      <div className="App center-text">
        <C3 isLoggedIn={this.state.isLoggedIn} />
        <Route
          path="/"
          render={() =>
            !this.state.isLoggedIn ? (
              <Login
                updateUser={this.updateUser}
              />
            ) : (
              <Dashboard
                isLoggedIn={this.state.isLoggedIn}
              />)}
          />
      </div>
    );
  }
}

export default App;
