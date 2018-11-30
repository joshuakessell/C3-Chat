import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Local from './Local.js';
import Glogin from './Glogin.js';
import Signup from './Signup.js';
import './Login.css';
import axios from 'axios';


class Login extends Component {

  constructor(props) {
    super(props);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.submitLocal = this.submitLocal.bind(this);
    this.submitNewLocal = this.submitNewLocal.bind(this);
    this.useGithubSignup = this.useGithubSignup.bind(this);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: ""
    }
  }

  onLoginChange(data) {
    this.setState(data);
  }

  useGithubSignup() {
    console.log("Github Signup");
  }

  submitNewLocal(event) {
    //request to server to add new user info
    axios.post('/user', {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email
    })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('successful signup')
          this.setState({ //redirect to login page
            redirectTo: '/'
          })
        } else {
          console.log('username already taken')
        }
      }).catch(error => {
        console.log('signup error: ')
        console.log(error)
      })
  }

  submitLocal(event) {
    event.preventDefault();
    axios.post('/user/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            isLoggedIn: true,
            username: response.data.username
          })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/dashboard'
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);

      })
  }

  submitGithub() {
    console.log("Create new from Github");
  }

  render() {
    return (
      <div className="center-text">
        <Switch>
          <Route
            exact path="/"
            render={() =>
              <Local
                onLoginChange={this.onLoginChange}
                submitLocal={this.submitLocal}
              />}
          />
          <Route
            exact path="/signup"
            render={() =>
                <Signup
                  handleSubmit={this.submitNewLocal}
                  onLoginChange={this.onLoginChange}
                />
              }
          />
          <Route
            exact path="/github"
            render={() =>
                <Glogin
                  handleSubmit={this.submitGithub}
              />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default Login;

