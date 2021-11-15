import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Home from '../home/Home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route
        exact
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route exact path="/" element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default AppRoutes
