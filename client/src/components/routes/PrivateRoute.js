import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ auth: { isAuthenticated, loading, user }, children }) => {
  return isAuthenticated && user && !loading ? children : <Navigate to="/login" />
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
