import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
    };
  }

  addStudent = event => {
    event.preventDefault();
    const newStudent = {
     firstname: this.state.firstname,
     lastname: this.state.lastname,
     email: this.state.email,
    }

     this.props.postStudent(newStudent);

    this.setState({
        firstname: '',
        lastname: '',
        email: '',
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="StudentForm">
        <form onSubmit={this.addStudent}>
          <input
            onChange={this.handleInputChange}
            placeholder="First name"
            value={this.state.firstname}
            name="firstname"
            type='text'
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Last name"
            value={this.state.lastname}
            name="lastname"
            type='text'
          />
          <input
            onChange={this.handleInputChange}
            placeholder="email"
            value={this.state.email}
            name="email"
            type='text'
          />
          <button type="submit">Add a new student</button>
          {/* <Link to='/'className='ilink'>Go to Village</Link> */}
        </form>
      </div>
    );
  }
}

export default StudentForm;