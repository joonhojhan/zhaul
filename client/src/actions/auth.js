import axios from 'axios'
import {
  USER_LOADED,
  LOGIN,
  LOGOUT,
  SIGNUP,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  CLEAR_AUTH_ERROR,
} from './types'

const config = {
  withCredentials: true,
}

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/me', config)
    dispatch({ type: USER_LOADED, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const signup = (firstName, lastName, email, password) => async (dispatch) => {
  const body = { firstName, lastName, email, password }
  try {
    const { data } = await axios.post('/auth/signup', body, config)
    dispatch({ type: SIGNUP, payload: data })
    dispatch(loadUser())
  } catch (error) {
    dispatch({ type: SIGNUP_ERROR })
    console.error(error)
  }
}

export const login = (email, password) => async (dispatch) => {
  const body = { email, password }
  try {
    const { data } = await axios.post('/auth/login', body, config)
    dispatch({
      type: LOGIN,
      payload: data,
    })
    dispatch(loadUser())
  } catch (error) {
    dispatch({ type: LOGIN_ERROR })
    console.error(error)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout', null, config)
    dispatch({ type: LOGOUT })
  } catch (error) {
    console.error(error)
  }
}

export const clearAuthError = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_ERROR })
}
