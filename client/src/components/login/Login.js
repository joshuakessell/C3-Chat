import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Local from './Local.js';
import Glogin from './Glogin.js';
import Signup from './Signup.js';
import C3 from './C3.js';
import axios from 'axios';


class Login extends Component {

  constructor(props) {
    super(props);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.submitLocal = this.submitLocal.bind(this);
    this.submitNewLocal = this.submitNewLocal.bind(this);
    this.useGithubSignup = this.useGithubSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      username: "",
      password: "",
      email: "",
      redirectTo: null,
      message: null
    }
  }

  componentDidMount = () => {
    if (this.state.message) {
      this.setState({ message: null })
    }
  }

  handleLogout(){
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          isLoggedIn: false,
          username: null,
        })
        this.history.push('/')
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  onLoginChange(data) {
    this.setState(data);
  }

  useGithubSignup() {
    console.log("Github Signup");
  }

  submitNewLocal() {
    console.log('here');
    //request to server to add new user info
    axios.post('/api/signup', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
            this.history.push('/')
          this.setState({
            message: "Signup successful. Please login now."
          })
        }
      })
      .catch(error => {
        console.log('signup error: ');
        console.log(error);
      })
    }
    

  submitLocal() {
    axios.post('/api/login', {
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
            this.history.push('/foo')
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);
        this.setState({message: "Login Unsuccessful"})
      })
  }

  submitGithub() {
    console.log("Create new from Github");
  }

  render() {
    return (
      <div className="center-text">
        <C3 isLoggedIn={this.state.isLoggedIn} logout={this.handleLogout} />
        <Switch>
          <Route
            exact path="/"
            render={() =>
              <Local
                onLoginChange={this.onLoginChange}
                submitLocal={this.submitLocal}
                message={this.state.message}
              />}
          />
          <Route
            exact path="/signup"
            render={() =>
              <Signup
                submitNewLocal={this.submitNewLocal}
                onLoginChange={this.onLoginChange}
                message={this.state.message}
              />
            }
          />
          <Route
            exact path="/github"
            render={() =>
              <Glogin
                handleSubmit={this.submitGithub}
                message={this.state.message}
              />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default Login;

