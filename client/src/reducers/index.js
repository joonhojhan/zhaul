import { combineReducers } from 'redux'
import auth from './auth'
import reservations from './reservations'
import trucks from './trucks'

export default combineReducers({ auth, reservations, trucks })
