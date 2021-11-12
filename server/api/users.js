const router = require('express').Router()
const User = require('../db/models/user')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

module.exports = router
