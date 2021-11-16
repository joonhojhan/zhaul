import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getReservationsHistory } from '../../actions/reservations'
import { Loading } from '../layouts/Loading'

const Reservations = ({
  getReservationsHistory,
  reservations: { reservations },
}) => {
  useEffect(() => {
    getReservationsHistory()
  }, [])
  return !reservations ? (
    <Loading />
  ) : reservations.length ? (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-6">
      <div className="md:flex md:items-center md:justify-between pb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Reservations History
          </h2>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Truck
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Start Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      End Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => {
                    const start = new Date(reservation.start)
                    const end = new Date(reservation.end)
                    return (
                      <tr key={reservation.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.truck.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.truck.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {start.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {end.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${reservation.price}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Fragment>
      <div className="text-center pt-6 text-lg">
        You don't have any past reservations!
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  reservations: state.reservations,
})

export default connect(mapStateToProps, { getReservationsHistory })(Reservations)
