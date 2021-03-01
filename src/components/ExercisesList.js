import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ExerciseList = props => {

    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                return setExercises(res.data.map(item => item.description))
            })
    }, [])

    return (
        <div>
            <ul>
                {exercises.map(item => <li key={item}>{item}</li>)}
            </ul>
        </div>
    )
}

export default ExerciseList