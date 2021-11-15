import axios from 'axios'
import { USER_LOADED, LOGIN, LOGOUT, SIGNUP } from './types'

const config = {
  withCredentials: true,
}

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:8080/auth/me', config)
    dispatch({ type: USER_LOADED, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const signup = (firstName, lastName, email, password) => async (dispatch) => {
  const body = { firstName, lastName, email, password }
  try {
    const { data } = await axios.post(
      'http://localhost:8080/auth/signup',
      body,
      config
    )
    dispatch({ type: SIGNUP, payload: data })
    dispatch(loadUser())
  } catch (error) {
    console.error(error)
  }
}

export const login = (email, password) => async (dispatch) => {
  const body = { email, password }
  try {
    const { data } = await axios.post(
      'http://localhost:8080/auth/login',
      body,
      config
    )
    dispatch({
      type: LOGIN,
      payload: data,
    })
    dispatch(loadUser())
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('http://localhost:8080/auth/logout', null, config)
    dispatch({ type: LOGOUT })
  } catch (error) {
    console.error(error)
  }
}
