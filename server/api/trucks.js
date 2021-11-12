const router = require('express').Router()
const Truck = require('../db/models/truck')
const Reservation = require('../db/models/reservation')
/*
	Get all trucks
	Get available trucks
*/

router.get('/', async (req, res, next) => {
  try {
    const trucks = await Truck.findAll()
    res.json(trucks)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

router.get('/available', async (req, res, next) => {
  try {
    const { start, end } = req.query

    res.json()
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

module.exports = router
