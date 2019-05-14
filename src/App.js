import React, { Component } from 'react';

//import SavedList from './Movies/SavedList';
import StudentsList from './StudentsList';
//import Movie from './Movies/Movie';
import { Route, Link } from 'react-router-dom';
import StudentListData from  './studentlist.json';
import './App.css'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [], 
      selected: []
    };
  }
  
      componentDidMount() {
     // axios
       // .get('http://localhost:5000/api/movies')
        //.then(response => {
          this.setState(() => ({ students: StudentListData }));
       // })
       // .catch(error => {
        //  console.error('Server Error', error);
       // });
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
  }
  render() {
    return (
      <div className="main">
      <h1>List of my students</h1>
        {/* <SavedList list={this.state.savedList} /> */}
        <Route
      exact path='/'
      render={(props) => <StudentsList {...props} 
      data={this.state.students} 
      postStudent={this.postStudent}
      selectedStudents={this.state.selected}
      setSelected={this.setSelected}
      />

      }
/>
        {/* <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" component={Movie} /> */}

      </div>
    );
  }
}