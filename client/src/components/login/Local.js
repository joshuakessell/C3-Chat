import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Input from './form/Input.js';
import Button from './form/Button.js';


class Local extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onLoginChange({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitNewLocal();
  }

  render() {
    return (
      <div>
        <div className="outline">
        <h5>Login</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="inline-block has-icon-left">
              <ul className="form-group inline-block">
                <li><Input className="form-group" placeholder="username" handleChange={this.handleChange} value={this.props.username} /></li>
                <li><Input className="form-group" placeholder="password" handleChange={this.handleChange} value={this.props.password} /></li>
              </ul>
              <ul className="form-group inline-block fright">
                <li><Button type="submit" value="login" /></li> 
              </ul>
            </div>
          </form>
          <div>
            < ul className="block">
              <li><Link to="/github"><Button value="use github" /></Link></li>
            </ul>
            <ul className="block">
              <li><Link to="/signup"><Button name="signup" value="don't have an account?" /></Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Local);