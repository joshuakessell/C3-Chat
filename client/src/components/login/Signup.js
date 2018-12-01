import React, { Component } from "react";
import Input from "./form/Input.js";
import Button from './form/Button.js';

class Signup extends Component {
  constructor(props){
    super(props)
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.props.onLoginChange({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitNewLocal(event);
  }

  render() {
    return (
      <div className="center">
        <p>Local Signup:</p>
        <form onSubmit={this.handleSubmit} className="form-group">
          <ul className="form-group">
            <li><Input placeholder="username" handleChange={this.handleChange} value={this.props.username} /></li>
            <li><Input placeholder="password" handleChange={this.handleChange} value={this.props.password} /></li>
            <li><Input placeholder="firstname" handleChange={this.handleChange} value={this.props.firstname} /></li>
            <li><Input placeholder="lastname" handleChange={this.handleChange} value={this.props.lastname} /></li>
            <li><Input placeholder="email" handleChange={this.handleChange} value={this.props.email} /></li>
          </ul>
          <ul className="form-group inline-block">
            <li><Button type="submit" value="sign up" /></li>
          </ul>
        </form>
      <Button value="Sign up with Github" />
      </div>
    )
  }
}

export default Signup;