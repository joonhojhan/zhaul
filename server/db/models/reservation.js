const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const db = require('../db')

const Reservation = db.define('reservation', {
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

module.exports = Reservation
