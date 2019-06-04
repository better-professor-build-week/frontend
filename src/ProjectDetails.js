import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./AuthService";

export default class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null,
            messages: []
        };
    }
    componentDidMount() {
        console.log("componentDidMount");
        Auth.fetch(`/projects/${this.props.project_id}`, {
            method: "GET"
        })
            .then(response => {
                console.log(response);
                this.setState(() => ({ project: response }));
            })
            .catch(error => {
                console.error("Server Error", error);
            });

        //   Auth.fetch(`/students-projects/${this.props.student_id}`, {
        //       method: "GET"
        //   })
        //       .then(response => {
        //           console.log(response);
        //           this.setState(() => ({ projects: response }));
        //       })
        //       .catch(error => {
        //           console.error("Server Error", error);
        //       });
        // }

        // postProject = project => {
        //   console.log("postProject", project);
        //   Auth.fetch(`/projects`, {
        //       method: "POST",
        //       body: JSON.stringify(project)
        //   })
        //       .then(response => {
        //           return Auth.fetch(`/professor-student-info`, {
        //               method: "POST",
        //               body: JSON.stringify({
        //                   student_id: this.props.student_id,
        //                   project_id: response.id
        //               })
        //           });
        //       })
        //       .then(response => {
        //           return Auth.fetch(`/projects/${response.project_id}`, {
        //               method: "GET"
        //           });
        //       })
        //       .then(response => {
        //           console.log(response);
        //           this.setState({
        //               projects: this.state.projects.concat(response)
        //           });
        //       })
        //       .catch(error => {
        //           console.error("Server Error", error);
        //       });
    }

    render() {
        const project = this.state.project;
        if (project == null) return null;
        return (
            <div className="second">
                <div className="Project">
                    <h3>Project name {project.project_name}</h3>
                    <p>Project deadline {project.project_deadline}</p>
                    <p>Feedback dealine: {project.feedback_deadline}</p>
                    <p>
                        Recommendation deadline:{" "}
                        {project.recommendation_deadline}
                    </p>
                    <p>
                        {this.state.messages.map(message => (
                            <MessageRow key={message.id} message={message} />
                        ))}
                    </p>
                    <Link className="home-button" to="/">
                        Home
                    </Link>
                    {/* <AddNewProject postProject={this.postProject} /> */}
                </div>
            </div>
        );
    }
}

class MessageRow extends Component {
    render() {
        const { message, sent_date } = this.state.message;
        return (
            <div>
                <div>
                    <em>{message}</em>
                </div>
                <div className="Data">
                    Data: <em>{sent_date}</em>
                </div>
            </div>
        );
    }
}
