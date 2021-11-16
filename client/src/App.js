import { useEffect, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import store from './store'
import AppRoutes from './components/routes/Routes'
import { loadUser } from './actions/auth'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Fragment>
      <Router>
        <AppRoutes />
      </Router>
    </Fragment>
  )
}
export default App
