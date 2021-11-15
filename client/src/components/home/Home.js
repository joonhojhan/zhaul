import React from 'react'
import { connect } from 'react-redux'
import { logout, loadUser } from '../../actions/auth'

const Home = ({ logout, loadUser }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    logout()
  }
  const handleLoad = (e) => {
    e.preventDefault()
    loadUser()
  }
  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Logout
          </button>
        </div>
      </form>
      <form className="space-y-6" onSubmit={handleLoad}>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Load user
          </button>
        </div>
      </form>
    </div>
  )
}

export default connect(null, { logout, loadUser })(Home)
