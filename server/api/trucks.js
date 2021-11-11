const router = require('express').Router()

router.get('/', (req, res, next) => {
  try {
    res.json({ message: `/ trucks route` })
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

module.exports = router
