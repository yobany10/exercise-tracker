import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Exercise from './Exercise'

const ExerciseList = props => {

    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                setExercises(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteExercise = id => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))
            setExercises(exercises.filter(item => item._id !== id))
    }

    const exerciseList = () => {
        return exercises.map(item => {
            return <Exercise exercise={item} deleteExercise={deleteExercise} key={item._id} />
        })
    }

    return (
        <div>
            <h3>Log</h3>
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}

export default ExerciseList