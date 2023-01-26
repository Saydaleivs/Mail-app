const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const loginRoute = require('./routes/login')
const usersRoute = require('./routes/users')
const messageRoute = require('./routes/message')

const mongoURI =
  'mongodb+srv://saeed:Ss20051018@cluster0.ctwkiye.mongodb.net/email-app'

mongoose.set('strictQuery', false)
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(err))

// Middlewares
app.use(express.json({ limit: '50mb' }))
app.use(cors())

// Routes
app.use('/api/login', loginRoute)
app.use('/api/users', usersRoute)
app.use('/api/message', messageRoute)

const port = process.env.PORT || 8000
const server = app.listen(port, () => {
  console.log(`Started listerning to port ${port}....`)
})

module.exports = server
