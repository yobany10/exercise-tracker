import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const EditExercise = props => {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const urlId = useParams().id

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/' + urlId)
            .then(res => {
                setUsername(res.data.username)
                setDescription(res.data.description)
                setDuration(res.data.duration)
                setDate(new Date(res.data.date))
            })
            .catch(err => {
                console.log(err)
            })
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if(res.data.length > 0) {
                    setUsers(res.data.map(user => user.username))
                }
                console.log(res)
            })
    },[])

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangeDescription = e => {
        setDescription(e.target.value)
    }

    const onChangeDuration = e => {
        setDuration(e.target.value)
    }

    const onChangeDate = date => {
        setDate(date)
    }

    const onSubmit = e => {
        e.preventDefault()

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        axios.post('http://localhost:5000/exercises/update/' + urlId, exercise)
            .then(res => console.log(res.data))

        window.location = '/'
    }

    return (
        <div>
            <h3>Edit log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select useref='userInput'
                    required
                    className='form-control'
                    value={username}
                    onChange={onChangeUsername}>
                        {users.map(item => {
                            return <option key={item} value={item}>{item}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <input
                    type='text'
                    className='form-control'
                    value={description}
                    onChange={onChangeDescription} />
                </div>
                <div className='form-group'>
                    <label>Duration (minutes): </label>
                    <input
                    type='text'
                    className='form-control'
                    value={duration}
                    onChange={onChangeDuration} />
                </div>
                <div className='form-group'>
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate} />
                    </div>
                </div>

                <div className='form-group'>
                    <input type='submit' value='Edit Log' className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default EditExercise