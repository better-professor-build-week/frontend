import React, { Component } from 'react';

//import SavedList from './Movies/SavedList';
import StudentsList from './StudentsList';
//import Movie from './Movies/Movie';
import { Route, Link } from 'react-router-dom';
import StudentListData from  './studentlist.json';
import './App.css'
import StudentsDetails from './StudentsDetails';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import Auth from './AuthService';


const apiRoot = 'https://betterprofessor.herokuapp.com/api';
  

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [], 
      selected: []
    };
  }


      componentDidMount() {
          Auth.fetch (`/professor-student-info`, {
            method: 'GET',
        })
          .then(response => {
            console.log(response);
          this.setState(() => ({ students: response }));
       })
       .catch(error => {
         console.error('Server Error', error);
       });
    }
  

  // addToSavedList = movie => {
  //   const savedList = this.state.savedList;
  //   savedList.push(movie);
  //   this.setState({ savedList });
  // };
  postStudent = (student) => {
    const students = this.state.students;
    students.push({...student, id: new Date, projects: []});
    this.setState({ students });
  }
  setSelected = (studentId, selected) => {
    console.log(selected)
    if (selected) {
    const selectedStudents =  this.state.selected.concat (studentId);
    this.setState ({selected: selectedStudents});
    }
    else {const comparedStudents = this.state.selected.filter(x => x != studentId);
    this.setState ({selected: comparedStudents});
  }
}
  studentDeleted = () => {
    this.setState ((state) =>{
      const listOfSaved = state.students.filter((student) => {
        if (state.selected.indexOf(student.student_id) != -1)
          return false;
        return true;
      });

  

      return ( {
        students: listOfSaved,
        selected: []
      } )

    })
  }
  getStudent = (id) => {
   const singleStudent = this.state.students.filter (student => student.student_id == id) 
      console.log(singleStudent);
   return singleStudent[0];
  }
  render() {
    return (
      <div className="main">
        {/* <SavedList list={this.state.savedList} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup}/>
        <div className="second">
        <PrivateRoute  exact path='/' render={(props) => <StudentsList {...props} 
                data={this.state.students} 
                postStudent={this.postStudent}
                selectedStudents={this.state.selected}
                setSelected={this.setSelected}
                deleted={this.studentDeleted}
                />}
         />

       <PrivateRoute path= '/student/:id' render={({match}) => <StudentsDetails student={this.getStudent(match.params.id)}/> }
        />
        </div>
      </div>
    );
  }
}