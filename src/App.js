import React, { Component } from "react";

//import SavedList from './Movies/SavedList';
import StudentsList from "./StudentsList";
//import Movie from './Movies/Movie';
import { Route, Link, withRouter } from "react-router-dom";
import StudentListData from "./studentlist.json";
import "./App.css";
import StudentsDetails from "./StudentsDetails";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup";
import Auth from "./AuthService";
import SignOutButton from "./SignOutButton";
import ProjectDetails from "./ProjectDetails";

const apiRoot = "https://betterprofessor.herokuapp.com/api";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            selected: []
        };
    }

    componentDidMount() {}

    // addToSavedList = movie => {
    //   const savedList = this.state.savedList;
    //   savedList.push(movie);
    //   this.setState({ savedList });
    // };

    loadStudentsList = () => {
        return Auth.fetch(`/professor-student-info`, {
            method: "GET"
        })
            .then(response => {
                console.log(response);
                this.setState(() => ({ students: response }));
            })
            .catch(error => {
                console.error("Server Error", error);
            });
    };

    postStudent = student => {
        Auth.fetch(`/students`, {
            method: "POST",
            body: JSON.stringify(student)
        })
            .then(response => {
                console.log(response);
                this.props.history.push(`/students/${response.id}`);
            })
            .catch(error => {
                console.error("Server Error", error);
            });
    };

    // this.setState( ( state ) => {
    //   const newStudent = state.students.concat({student: student,
    //     id:  new Date,
    //     projects: []
    //   } );

    //   console.log("newStudent", newStudent);
    //   return ( {
    //     student: newStudent;
    //   } )
    // } );

    setSelected = (studentId, selected) => {
        console.log(selected);
        if (selected) {
            const selectedStudents = this.state.selected.concat(studentId);
            this.setState({ selected: selectedStudents });
        } else {
            const comparedStudents = this.state.selected.filter(
                x => x != studentId
            );
            this.setState({ selected: comparedStudents });
        }
    };
    studentDeleted = () => {
        this.state.selected.forEach(studentId => {
            Auth.fetch(`/students/${studentId}`, {
                method: "DELETE"
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error("Server Error", error);
                });
        });

        this.setState(state => {
            const listOfSaved = state.students.filter(student => {
                if (state.selected.indexOf(student.student_id) != -1)
                    return false;
                return true;
            });

            return {
                students: listOfSaved,
                selected: []
            };
        });
    };
    getStudent = id => {
        const singleStudent = this.state.students.filter(
            student => student.student_id == id
        );
        console.log(singleStudent);
        return singleStudent[0];
    };
    render() {
        return (
            <div className="main">
                {/* <SavedList list={this.state.savedList} /> */}
                <SignOutButton />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route
                    exact
                    path="/loginaftersignup"
                    render={props => <Login register={true} />}
                />
                <PrivateRoute
                    exact
                    path="/"
                    render={props => (
                        <StudentsList
                            {...props}
                            data={this.state.students}
                            postStudent={this.postStudent}
                            selectedStudents={this.state.selected}
                            setSelected={this.setSelected}
                            deleted={this.studentDeleted}
                            loadStudentsList={this.loadStudentsList}
                        />
                    )}
                />
                <PrivateRoute
                    path="/students/:id"
                    render={({ match }) => (
                        <StudentsDetails student_id={match.params.id} />
                    )}
                />
                <PrivateRoute
                    path="/projects/:id"
                    render={({ match }) => (
                        <ProjectDetails project_id={match.params.id} />
                    )}
                />
            </div>
        );
    }
}

export default withRouter(App);
