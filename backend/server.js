const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// connect to mongoDB database
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection
// once connection is established, do this
connection.once('open', () => {
    console.log("CONNECTED TO MONGODB!!!")
})

// route files stored in variable
const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

// if this url is hit, then load everything in the specified file (app.use)
app.use('/exercises', exerciseRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}. Awesome!!!`)
})