import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";
import "./StudentsList.css";

export default class StudentsList extends Component {
  componentDidMount() {
    this.props.loadStudentsList();
  }
  render() {
    return (
      <div className="second">
        <div className="Studentslist">
          <h1>List of my students</h1>
          <ToolBar
            selected={this.props.selectedStudents}
            deleteAction={this.props.deleted}
          />
          <StudentForm postStudent={this.props.postStudent} />
          {this.props.data.map(student => (
            <StudentRow
              key={student.student_id}
              student={student}
              setSelected={this.props.setSelected}
              selected={
                this.props.selectedStudents.indexOf(student.student_id) != -1
              }
            />
          ))}
        </div>
      </div>
    );
  }
}
class ToolBar extends Component {
  render() {
    return (
      <div>
        {this.props.selected.length > 0 ? (
          <div>
            <button onClick={this.props.deleteAction}>Delete</button>{" "}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
class StudentRow extends Component {
  handleInputChange = e => {
    this.props.setSelected(this.props.student.student_id, e.target.checked);
  };

  render() {
    const { student, selected } = this.props;
    const { firstname, lastname, email, projects } = student;
    return (
      <div>
        <div className="String">
          <input
            type="checkbox"
            value={selected}
            onChange={this.handleInputChange}
          />
          <div className="Data">
            <Link to={`/students/${student.student_id}`}>
              <em>{firstname}</em> <em>{lastname}</em>
            </Link>
          </div>

          <div className="Data">
            E-mail: <em>{email}</em>
          </div>
          <Link to={`/students/${student.student_id}`}>
            <span className="Projects"> Projects </span>
          </Link>
        </div>
      </div>
    );
  }
}
