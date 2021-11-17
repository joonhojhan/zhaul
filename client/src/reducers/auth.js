import {
  USER_LOADED,
  LOGIN,
  LOGOUT,
  SIGNUP,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  CLEAR_AUTH_ERROR,
} from '../actions/types'

const initialState = {
  user: null,
  isAuthenticated: null,
  loading: true,
  error: null,
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
    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: {
          type: LOGIN_ERROR,
          message:
            'Error occurred while signing in. Please check if your credentials are correct.',
        },
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: {
          type: SIGNUP_ERROR,
          message:
            'Error occurred while creating your account. A user with this email may already exist.',
        },
      }
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
