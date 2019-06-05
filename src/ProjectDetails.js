import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./AuthService";
import SendNewMessage from "./SendNewMessage";

export default class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null,
            students: [],
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

        Auth.fetch(`/projects/${this.props.project_id}/students`, {
            method: "GET"
        })
            .then(response => {
                console.log(response);
                this.setState(() => ({ students: response }));
                return response;
            })
            .catch(error => {
                console.error("Server Error", error);
            });

        Auth.fetch(`/projects/${this.props.project_id}/messages`, {
            method: "GET"
        })
            .then(response => {
                this.setState(() => ({ messages: response }));
            })
            .catch(error => {
                console.error("Server Error", error);
            });
    }

    sendMessage = message => {
        console.log("postMessage", message);
        Auth.fetch(`/projects/${this.props.project_id}/messages`, {
            method: "POST",
            body: JSON.stringify(message)
        })

            .then(response => {
                return Auth.fetch(
                    `/projects/${this.props.project_id}/messages`,
                    {
                        method: "GET"
                    }
                );
            })
            .then(response => {
                this.setState(() => ({ messages: response }));
            })
            .catch(error => {
                console.error("Server Error", error);
            });
    };
    getStudent = student_id => {
        const student = this.state.students.filter(
            student => student.student_id == student_id
        )[0];
        return student;
    };
    render() {
        const project = this.state.project;
        if (project == null) return null;
        return (
            <div className="second">
                <div className="Project">
                    <h3>Project name {project.project_name}</h3>
                    <div>
                        Students:{" "}
                        {this.state.students.map(student => (
                            <div key={student.student_id}>
                                {student.firstname} {student.lastname}
                            </div>
                        ))}
                    </div>
                    <p>Project deadline {project.project_deadline}</p>
                    <p>Feedback dealine: {project.feedback_deadline}</p>
                    <p>
                        Recommendation deadline:{" "}
                        {project.recommendation_deadline}
                    </p>
                    <div>
                        {this.state.messages.map(message => (
                            <MessageRow
                                key={message.id}
                                message={message}
                                student={this.getStudent(message.student_id)}
                            />
                        ))}
                    </div>
                    <Link className="home-button" to="/">
                        Home
                    </Link>
                    <SendNewMessage
                        sendMessage={this.sendMessage}
                        students={this.state.students}
                    />
                </div>
            </div>
        );
    }
}

class MessageRow extends Component {
    render() {
        console.log(this.props);
        const { message, send_date } = this.props.message;
        return (
            <div>
                <div>
                    {this.props.student.firstname} {this.props.student.lastname}
                </div>
                <div>
                    <em>{message}</em>
                </div>
                <div className="Data">
                    Data: <em>{send_date}</em>
                </div>
            </div>
        );
    }
}
