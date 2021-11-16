import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAvailableTrucks } from '../../actions/trucks'
import { Loading } from '../layouts/Loading'

const SelectTruck = ({
  startDate,
  endDate,
  type,
  handleStepsForward,
  handleStepsBack,
  truckId,
  setTruckId,
  trucks: { available },
  getAvailableTrucks,
}) => {
  useEffect(() => {
    getAvailableTrucks(startDate, endDate, type)
  }, [])

  return (
    <div className="pt-6">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {!available ? (
                <Loading />
              ) : available.length ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
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
                        Price / Day
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider float-right"
                      >
                        Select
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {available.map((el) => {
                      return (
                        <tr key={el.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {el.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {el.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {`$${el.price}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 float-right mr-4">
                            <input
                              type="checkbox"
                              checked={truckId === el.id}
                              disabled={truckId !== null && truckId !== el.id}
                              onChange={() => {
                                if (truckId === el.id) {
                                  setTruckId(null)
                                } else {
                                  setTruckId(el.id)
                                }
                              }}
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <Fragment>
                  <div className="text-center pt-6 text-lg">
                    There are not trucks available in the given time frame and/or
                    type!
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 float-left"
          onClick={handleStepsBack}
        >
          Select date & time
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 float-right"
          onClick={(e) => {
            if (!truckId) {
              alert('Please select a truck to reserve!')
            } else {
              handleStepsForward(e)
            }
          }}
        >
          Payment
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  trucks: state.trucks,
})

export default connect(mapStateToProps, { getAvailableTrucks })(SelectTruck)
