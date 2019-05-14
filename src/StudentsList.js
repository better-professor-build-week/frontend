import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import './StudentsList.css';

export default class StudentsList extends Component {
  render() {
    return (
      <div className="Studentslist">
       <StudentForm postStudent={this.props.postStudent} 
       />
        {this.props.data.map(student => (    
            <StudentDetails key={student.student_id} 
            student={student} 
            setSelected={this.props.setSelected}
            selected={this.props.selectedStudents.indexOf(student.student_id) != -1}/>
        ))}
      </div>
    );
  }
}

class StudentDetails extends Component {

  handleInputChange = e => 
  {
    this.props.setSelected(this.props.student.student_id, e.target.value)
};
 

  render ()
  { const { student, selected } = this.props;
  const { firstname, lastname, email, projects } = student;
  return (
    <div className="String">
      <input type="checkbox" value = {selected}
       onChange={this.handleInputChange}></input> 
        <div className="Data">
        <Link to={`/students/${student.student_id}`}>
     <em>{firstname}</em> <em>{lastname}</em>
     </Link>
      </div>

      <div className="Data">
        E-mail: <em>{email}</em>
        </div>
         <Link to={`/students/${student.id}`}>
      <span className="Projects"> Projects </span>
      </Link>
      {/* {projects.map(project => (
        <div key={project.project_id}>
          {project.project_name}
        </div>
      ))} */}
    </div>
  );
}
}


