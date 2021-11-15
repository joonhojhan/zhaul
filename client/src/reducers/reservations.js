import { GET_RESERVATIONS_HISTORY, MAKE_RESERVATION } from '../actions/types'

const initialState = {
  reservations: null,
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_RESERVATIONS_HISTORY:
      return {
        ...state,
        reservations: payload,
        loading: false,
      }
    default:
      return state
  }
}
