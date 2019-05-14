import React, { Component } from 'react';

//import SavedList from './Movies/SavedList';
import StudentsList from './StudentsList';
//import Movie from './Movies/Movie';
import { Route, Link } from 'react-router-dom';
import StudentListData from  './studentlist.json';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
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

  render() {
    return (
      <div>
        {/* <SavedList list={this.state.savedList} /> */}
        <Route
      exact path='/'
      render={(props) => <StudentsList {...props} data={this.state.students} postStudent={this.postStudent}/>
      }
/>
        {/* <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" component={Movie} /> */}

      </div>
    );
  }
}