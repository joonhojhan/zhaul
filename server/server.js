require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })

const app = express()

const PORT = process.env.PORT || 8080

let corsOptions = {
  origin: 'http://localhost:8081',
}

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

const createApp = () => {
  app.use(cors(corsOptions))

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'chariot-session',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
}

const syncDb = () => db.sync({ force: true })

async function bootApp() {
  await syncDb()
  await createApp()
  await startListening()
}

bootApp()
