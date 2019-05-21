import React, { Component } from 'react';
import './Login.css';
import Auth from './AuthService';
import { Route, Link,withRouter } from 'react-router-dom';


class Login extends Component {
    constructor(){
        super();
        
    }
    componentWillMount(){
        if(Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <div>{this.props.register ? 'Log in with your new credentials': ' '}</div>
                        <div className="form">
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <button
                            className="form-submit"
                            onClick = {this.handleFormSubmit}>
                            Login
                       </button>
                       
                       <p><span>If you don't have an account, </span>
                       <Link to={`/signup`}>
                       <span>sign up here</span>
                        </Link>
                       </p>
                       </div>
                </div>
            </div>
        );
    }
     
    handleChange = e =>
    {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = e =>
    {
        e.preventDefault();
      
        Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.props.history.push("/");
            })
            .catch(err =>{
                alert(err);
            })
    }
}

export default  withRouter (Login);