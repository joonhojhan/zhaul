const router = require('express').Router()
const Truck = require('../db/models/truck')
const Reservation = require('../db/models/reservation')
const { Op } = require('sequelize')
/*
	Get all trucks
	Get available trucks
*/

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const trucks = await Truck.findAll()
      return res.json(trucks)
    }
    return res.status(403).send('You need to be an admin to access this route!')
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

router.get('/available', async (req, res, next) => {
  try {
    const { start, end } = req.query
    const trucks = await Truck.findAll()
    const notAvailable = await Truck.findAll({
      include: {
        model: Reservation,
        where: {
          start: {
            [Op.gte]: new Date(start),
          },
          end: {
            [Op.lte]: new Date(end),
          },
        },
      },
    })
    const result = []
    for (let i = 0; i < trucks.length; i++) {
      let found = false
      for (let j = 0; j < notAvailable.length; j++) {
        if (trucks[i].id === notAvailable[j].id) {
          found = true
          break
        }
      }
      if (!found) {
        result.push(trucks[i])
      }
    }
    return res.json(result)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

module.exports = router
