import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./AuthService";
import AddNewProject from "./AddNewProject";

export default class StudentsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            projects: []
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
        Auth.fetch(`/students/${this.props.student_id}`, {
            method: "GET"
        })
            .then(response => {
                console.log(response);
                this.setState(() => ({ student: response }));
            })
            .catch(error => {
                console.error("Server Error", error);
            });
        Auth.fetch(`/students-projects/${this.props.student_id}`, {
            method: "GET"
        })
            .then(response => {
                console.log(response);
                this.setState(() => ({ projects: response }));
            })
            .catch(error => {
                console.error("Server Error", error);
            });
    }

    postProject = project => {
        console.log("postProject", project);
        Auth.fetch(`/projects`, {
            method: "POST",
            body: JSON.stringify(project)
        })
            .then(response => {
                return Auth.fetch(`/professor-student-info`, {
                    method: "POST",
                    body: JSON.stringify({
                        student_id: this.props.student_id,
                        project_id: response.id
                    })
                });
            })
            .then(response => {
                return Auth.fetch(`/projects/${response.project_id}`, {
                    method: "GET"
                });
            })
            .then(response => {
                console.log(response);
                this.setState({
                    projects: this.state.projects.concat(response)
                });
            })
            .catch(error => {
                console.error("Server Error", error);
            });
    };

    render() {
        const student = this.state.student;
        if (student == null) return null;
        return (
            <div className="second">
                <div className="Student">
                    <h3>
                        Student name {student.firstname} {student.lastname}
                    </h3>
                    <p>Email {student.email}</p>
                    <div>
                        Projects
                        {(this.state.projects || []).map(project => (
                            <div key={project.id}>
                                <input
                                    type="checkbox"
                                    onChange={this.handleInputChange}
                                />
                                <ProjectRow
                                    key={project.id}
                                    project={project}
                                />

                                {/* //  {project.project_name}
                            //  {project.project_deadline}
                            //  {project.feedback_deadline}
                            //  {project.recommendation_deadline} */}
                            </div>
                        ))}
                    </div>
                    <Link className="home-button" to="/">
                        Home
                    </Link>
                    <AddNewProject postProject={this.postProject} />
                </div>
            </div>
        );
    }
}

class ProjectRow extends Component {
    render() {
        const { project } = this.props;
        const {
            project_name,
            project_deadline,
            feedback_deadline,
            recommendation_deadline
        } = project;
        return (
            <div>
                <div>
                    <Link to={`/projects/${project.id}`}>
                        <em>{project_name}</em>
                    </Link>
                </div>
                <div className="Data">
                    Project deadline: <em>{project_deadline}</em>
                    Feedback dealine: <em>{feedback_deadline}</em>
                    Recommendation deadline: <em>{recommendation_deadline}</em>
                </div>
            </div>
        );
    }
}
