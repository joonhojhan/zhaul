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
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Truck
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Start Time
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      End Time
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => {
                    const start = new Date(reservation.start)
                    const end = new Date(reservation.end)
                    return (
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.truck.name}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.truck.type}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {start.toLocaleString()}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {end.toLocaleString()}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
