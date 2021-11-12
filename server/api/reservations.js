const router = require('express').Router()
const Reservation = require('../db/models/reservation')
const User = require('../db/models/user')
/*
	Get all reservations
	Get single reservation
	Make reservation
*/

router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll()
    res.json(reservations)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { start, end, truckId } = req.body
    const reservation = await Reservation.create({
      start,
      end,
      truckId,
      userId: req.user.id,
    })
    res.json(reservation)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

module.exports = router
