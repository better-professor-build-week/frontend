import React, { Component } from 'react';
import Auth from './AuthService';
import { withRouter } from 'react-router-dom';

class SignOutButton extends Component {
   signOut = e =>{
    Auth.logout()
    this.props.history.replace('/login');
   }
   


    render() {
        if  (! Auth.loggedIn())
        return null

      return (
          <button onClick={this.signOut}>Sign out</button>
  
             )
    }
}

export default  withRouter (SignOutButton);