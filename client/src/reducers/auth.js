import { USER_LOADED, LOGIN, LOGOUT, SIGNUP } from '../actions/types'

const initialState = {
  user: null,
  isAuthenticated: null,
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      if (payload.id) {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        }
      } else {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
        }
      }
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    case SIGNUP:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    default:
      return state
  }
}
