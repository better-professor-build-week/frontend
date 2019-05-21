import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class StudentsDetails extends Component {
    render() {
      return (
          <div className="second">
        <div className="Student">
         <h3>Student name {this.props.student.firstname} {this.props.student.lastname}</h3>
         <p>Email {this.props.student.email}</p>
         <p>Projects {(this.props.student.project ||[]).map(project => (
                     <div key={project.project_id}>
                             {project.project_name}
                     </div>)) 
            }
        </p>
        <Link  className="home-button" to="/">Home</Link>
        </div>
        </div>
      )   
    }
}
  
        
        