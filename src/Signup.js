import React, { Component } from 'react';
import './Login.css';
import Auth from './AuthService';
import { Route, Link, withRouter } from 'react-router-dom';


class Signup extends Component {
    constructor(){
        super();
        
    }
    // componentWillMount(){
    //     if(Auth.loggedIn())
    //         this.props.history.replace('/');
    // }

    
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Sign up</h1>
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
                            Sign Up
                       </button>
                       <p> <span>If you already have an account, </span>
                       <Link to={`/login`}>
                       <span>login here</span>
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
      
        Auth.signup(this.state.username,this.state.password)
            .then(res =>{this.props.history.push("/loginaftersignup");
            })
            
                
       
            .catch(err =>{
                alert(err);
            })
    }
}

export default  withRouter (Signup);