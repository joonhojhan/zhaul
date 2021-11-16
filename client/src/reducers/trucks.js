import {
  GET_TRUCKS,
  GET_AVAILABLE_TRUCKS,
  GET_TRUCK,
  CLEAR_TRUCK,
} from '../actions/types'

const initialState = {
  truck: null,
  trucks: null,
  available: null,
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_TRUCKS:
      return {
        ...state,
        trucks: payload,
        loading: false,
      }
    case GET_AVAILABLE_TRUCKS:
      return {
        ...state,
        available: payload,
        loading: false,
      }
    case GET_TRUCK:
      return {
        ...state,
        loading: false,
        truck: payload,
      }
    case CLEAR_TRUCK:
      return {
        ...state,
        loading: false,
        truck: null,
      }
    default:
      return state
  }
}
