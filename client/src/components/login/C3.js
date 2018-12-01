import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Button from './form/Button';

class C3 extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout() {
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          isLoggedIn: false,
          username: null
        })
        this.setState({
          redirectTo: '/'
        })
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  renderRedirect = () => {
    if (this.state.redirectTo === '/') {
      return <Redirect to={this.state.redirectTo} />
    }
  }

    render(){
      return (
        <div>
          <div className='title'>
            <Link to="/" className="btn btn-link btn-lg">C3</Link>
            <br />
            <div className="nav">
              {this.props.isLoggedIn ?
                <Button value="logout" useClick={this.logout} /> :
                <Link to="/" className="btn btn-link text-primary" replace={true}>Login</Link>}
            </div>
            Communicate. Collaborate. Create.
          <hr />
          </div>
        </div>
      )
    }
  }

  export default C3;