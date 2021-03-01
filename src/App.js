import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ExerciseList from './components/ExercisesList'
import EditExercise from './components/EditExercise'
import CreateExercise from './components/CreateExercise'
import CreateUser from './components/CreateUser'

const App = () => {
  return (
    <Router>
      <Navbar />
        <div style={{padding: '1rem 2rem'}}>
          <Route exact path='/'><ExerciseList /></Route>
          <Route exact path='/edit/:id'><EditExercise /></Route>
          <Route exact path='/create'><CreateExercise /></Route>
          <Route exact path='/user'><CreateUser /></Route>
        </div>
    </Router>
  )
}

export default App