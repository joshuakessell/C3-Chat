import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Button from './form/Button';

class C3 extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }


    render(){
      return (
        <div>
          <div className='title'>
            <h1>C3</h1><h5 className="inline">Communicate. Collaborate. Create.</h5>
            <br />
            <div className="nav">
              {this.props.isLoggedIn ?
                <Button value="logout" useClick={this.logout} target="/" /> :
                <Link to="/"><Button value="login" /></Link>}
            </div>
            

          </div>
        </div>
      )
    }
  }

  export default C3;