const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')

const express = require('express')
const app = express()

require('express-async-errors') // Async and await errors are automatically passed to the error handling middleware

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

logger.info('connecting to', config.MONGODB_URI)
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

module.exports = app