const express = require('express')
const cors = require('cors')
const db = require('./db')
require('dotenv').config()

const app = express()

const users = require('./routes/users')
const trucks = require('./routes/trucks')
const reservations = require('./routes/reservations')

const PORT = process.env.PORT || 8080

let corsOptions = {
  origin: 'http://localhost:8081',
}

const createApp = () => {
  app.use(cors(corsOptions))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use('/api/users', users)
  app.use('/api/trucks', trucks)
  app.use('/api/reservations', reservations)
}

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
}

const syncDb = () => db.sync()

async function bootApp() {
  await syncDb()
  await createApp()
  await startListening()
}

bootApp()
