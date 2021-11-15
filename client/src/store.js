import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const middleware =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(
        applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
      )
    : compose(applyMiddleware(thunkMiddleware))

function saveStateToStorage(state) {
  try {
    const stringState = JSON.stringify(state)
    localStorage.setItem('state', stringState)
  } catch (error) {
    console.error(error)
  }
}

function loadStateFromStorage() {
  try {
    const stringState = localStorage.getItem('state')
    if (stringState === null) return undefined
    return JSON.parse(stringState)
  } catch (error) {
    console.error(error)
    return undefined
  }
}

const savedState = loadStateFromStorage()

const store = createStore(rootReducer, savedState, middleware)
// console.log('store.getState()', store.getState())
store.subscribe(() => saveStateToStorage(store.getState()))

export default store
