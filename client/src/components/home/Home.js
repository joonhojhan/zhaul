import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import Navbar from '../layouts/Navbar'
import Reserve from '../reservations/Reserve'
import Reservations from '../reservations/Reservations'

const Home = ({ logout }) => {
  const [activeTab, setActiveTab] = useState('reservations')
  const tabs = ['Reservations', 'Reserve']
  const handleSubmit = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <Fragment>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {activeTab.toLowerCase() === 'reservations' && <Reservations />}
      {activeTab.toLowerCase() === 'reserve' && <Reserve />}
    </Fragment>
  )
}

export default connect(null, { logout })(Home)
