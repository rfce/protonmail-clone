const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const apis = require('./routes/api')

const PORT = process.env.PORT || 5000

// Loads environment variables globally during development
// Using .env file
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const whitelist = ['http://localhost:3000', 'undefined', process.env.ORIGIN]

app.use(cors({
    origin: (origin, callback) => {
        if (whitelist.some(item => String(origin) == item)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    optionsSuccessStatus: 200
}))

// Routes
app.use('/api', apis)

// Connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { console.log("Successfully connected to database") })
    .catch(error => {
        console.log("[-] Mongoose error")
        console.log(error)
    })

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})

