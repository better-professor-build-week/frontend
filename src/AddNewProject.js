import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class AddNewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: '',
      projectdeadline: '',
      feedbackdeadline: '',
      recommendationdeadline: ''
    };
  }
  
  addProject = event => {
    event.preventDefault();
    const newProject = {
     projectName: this.state.projectname,
     projectDeadline: this.state.projectdeadline,
     feedbackDeadline: this.state.feedbackdeadline,
     recommendationDeadline: this.state. recommendationdeadline
    }
 
     this.props.postProject(newProject);

    this.setState({
      projectname: '',
      projectdeadline: '',
      feedbackdeadline: '',
      recommendationdeadline: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="ProjectForm">
        <form onSubmit={this.addProject}>
          <input className="Input"
            onChange={this.handleInputChange}
            placeholder="Project name"
            value={this.state.projectname}
            name="projectname"
            type='text'
          />
          <input className="Input"
            onChange={this.handleInputChange}
            placeholder="Project deadline"
            value={this.state.projectdeadline}
            name="projectdeadline"
            type='datetime-local'
          />
          <input  className="Input"
            onChange={this.handleInputChange}
            placeholder="Feedback deadline"
            value={this.state.feedbackdeadline}
            name="feedbackdeadline"
            type='datetime-local'
          />
          <input  className="Input"
            onChange={this.handleInputChange}
            placeholder="Recommendation deadline"
            value={this.state.recommendationdeadline}
            name="recommendationdeadline"
            type='datetime-local'
          />

          <button type="submit">Add a new project</button>
          {/* <Link to='/'className='ilink'>Go to Village</Link> */}
        </form>
      </div>
    );
  }
}

export default AddNewProject;