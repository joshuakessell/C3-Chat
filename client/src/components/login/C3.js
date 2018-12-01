import React, { Component } from "react";
import Button from './form/Button';

class C3 extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout() {
    this.props.logoutS();
  }

  login() {
    this.props.login();
  }


    render(){
      return (
        <div>
          <div className='title'>
            <h1>C3</h1><h5 className="inline">Communicate. Collaborate. Create.</h5>
            <br />
            <div className="nav">
              {this.props.isLoggedIn ?
                <Button value="logout" useClick={this.logout} /> :
                <Button value="login" useClick={this.login} />}
            </div>
            

          </div>
        </div>
      )
    }
  }

  export default C3;