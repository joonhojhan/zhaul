import axios from 'axios'
import { GET_TRUCK, GET_TRUCKS, GET_AVAILABLE_TRUCKS, CLEAR_TRUCK } from './types'

const config = {
  withCredentials: true,
}

export const getTrucks = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/trucks/', config)
    dispatch({ type: GET_TRUCKS, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const getAvailableTrucks = (start, end, type) => async (dispatch) => {
  try {
    let startString = start.toString()
    let endString = end.toString()
    const { data } = await axios.get(
      `http://localhost:8080/api/trucks/available?start=${startString}&end=${endString}&type=${type}`,
      config
    )
    dispatch({ type: GET_AVAILABLE_TRUCKS, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const getTruck = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/trucks/${id}`)
    dispatch({ type: GET_TRUCK, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const clearTruck = () => (dispatch) => {
  dispatch({ type: CLEAR_TRUCK })
}
