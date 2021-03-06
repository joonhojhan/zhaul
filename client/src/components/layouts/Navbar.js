import React, { useState } from 'react'
import { connect } from 'react-redux'
import logo from '../../resources/ZHAUL_logo_final.png'
import profile from '../../resources/profile.jpg'
import { logout } from '../../actions/auth'

const Navbar = ({ activeTab, setActiveTab, tabs, logout }) => {
  const [userMenu, toggleUserMenu] = useState(false)
  const [mainMenu, toggleMainMenu] = useState(false)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => toggleMainMenu(!mainMenu)}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src={logo} alt="ZHAUL" />
              <img className="hidden lg:block h-8 w-auto" src={logo} alt="ZHAUL" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {tabs.map((tab) => {
                  if (activeTab === tab.toLowerCase()) {
                    return (
                      <span
                        key={tab}
                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                        onClick={() => {
                          setActiveTab(tab.toLowerCase())
                          toggleMainMenu(false)
                        }}
                      >
                        {tab}
                      </span>
                    )
                  } else {
                    return (
                      <span
                        key={tab}
                        to={`/${tab.toLowerCase()}`}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                        onClick={() => {
                          setActiveTab(tab.toLowerCase())
                          toggleMainMenu(false)
                        }}
                      >
                        {tab}
                      </span>
                    )
                  }
                })}
                {/* <a
                  href="#"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Team
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Projects
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Calendar
                </a> */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => toggleUserMenu(!userMenu)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={profile} alt="" />
                </button>
              </div>

              {userMenu && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <span
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                    onClick={() => {
                      setActiveTab('reservations')
                      toggleUserMenu(false)
                    }}
                  >
                    Reservations
                  </span>
                  <span
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={() => {
                      logout()
                      toggleUserMenu(false)
                    }}
                  >
                    Sign out
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mainMenu && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {tabs.map((tab) => {
              if (activeTab === tab.toLowerCase()) {
                return (
                  <span
                    key={tab}
                    className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                  </span>
                )
              } else {
                return (
                  <span
                    key={tab}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                  </span>
                )
              }
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default connect(null, { logout })(Navbar)
