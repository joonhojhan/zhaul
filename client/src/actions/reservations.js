import axios from 'axios'
import { GET_RESERVATIONS_HISTORY, MAKE_RESERVATION } from './types'

const config = {
  withCredentials: true,
}

export const getReservationsHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/reservations/history', config)
    dispatch({ type: GET_RESERVATIONS_HISTORY, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const makeReservation = (start, end, truckId) => async (dispatch) => {
  const body = { start, end, truckId }
  try {
    const { data } = await axios.post('/api/reservations', body, config)
    dispatch({ type: MAKE_RESERVATION, payload: data })
  } catch (error) {
    console.error(error)
  }
}
