import { combineReducers } from 'redux'
import auth from './auth'
import reservations from './reservations'

export default combineReducers({ auth, reservations })
