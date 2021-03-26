import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const CreateExercise = props => {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('https://peaceful-sierra-22562.herokuapp.com/users/')
            .then(res => {
                if(res.data.length > 0) {
                    setUsers(res.data.map(user => user.username))
                    setUsername(res.data[0].username)
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

        console.log(exercise)

        axios.post('https://peaceful-sierra-22562.herokuapp.com/exercises/add', exercise)
            .then(res => console.log(res.data))

        window.location = '/'
    }

    return (
        <div>
            <h3>Create new log</h3>
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
                    <input type='submit' value='Create Log' className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise