import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';

export default class StudentsList extends Component {
  render() {
    return (
      <div>
       <StudentForm postStudent={this.props.postStudent} />
        {this.props.data.map(student => (
          <Link to={`/students/${student.id}`}>
            <StudentDetails key={student.id} student={student} />
          </Link>
        ))}
      </div>
    );
  }
}

function StudentDetails({ student }) {
  const { firstname, lastname, email, projects } = student;
  return (
    <div>
        <div>
     First name: <em>{firstname}</em>
     </div>
      <div>
        Last name: <em>{lastname}</em>
      </div>
      <div>
        E-mail: <em>{email}</em>
        </div>
        
      <h3>Projects</h3>

      {projects.map(project => (
        <div key={project.project_id}>
          {project.project_name}
        </div>
      ))}
    </div>
  );
}


