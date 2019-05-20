import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom';
import Auth from './AuthService';


const PrivateRoute = ({ component: Component, render, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.loggedIn()
          ? (render? render(props): <Component {...props} />)
          : <Redirect to='/login' />
      )} />
)


export default PrivateRoute;

