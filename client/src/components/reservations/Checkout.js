import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { clearTruck, getTruck } from '../../actions/trucks'
import { makeReservation } from '../../actions/reservations'
import { Loading } from '../layouts/Loading'
import StripeContainer from '../stripe/StripeContainer'
import useModal from '../layouts/useModal'
import ModalOverlay from '../layouts/ModalOverlay'

const Checkout = ({
  handleStepsBack,
  startDate,
  endDate,
  truckId,
  getTruck,
  clearTruck,
  makeReservation,
  trucks: { truck },
  setActiveTab,
}) => {
  const [showStripe, setShowStripe] = useState(false)
  const { isShowing, toggle } = useModal()

  useEffect(() => {
    getTruck(truckId)
  }, [])

  const handleStripe = (e) => {
    e.preventDefault()
    toggle()
    setShowStripe(true)
  }

  const handleCheckout = () => {
    makeReservation(startDate, endDate, truckId)
  }

  return !truck ? (
    <Loading />
  ) : (
    <div className="pt-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Reservation Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please confirm everything is correct before checking out!
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Start Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-start-3 sm:col-span-1">
                {startDate.toLocaleString()}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">End Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-start-3 sm:col-span-1">
                {endDate.toLocaleString()}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Truck Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-start-3 sm:col-span-1">
                {truck.name}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Truck Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-start-3 sm:col-span-1">
                {truck.type}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price / Day</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-start-3 sm:col-span-1">
                {`$${truck.price}`}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-start-3 sm:col-span-1">
                $
                {(
                  Number(truck.price * (endDate - startDate)) /
                  (1000 * 60 * 60 * 24)
                ).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="pt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 float-left mb-6"
          onClick={handleStepsBack}
        >
          Choose a truck
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 float-right mb-6"
          onClick={handleStripe}
        >
          Checkout
        </button>
      </div>
      {showStripe && (
        <StripeContainer
          setShowStripe={setShowStripe}
          toggle={toggle}
          start={startDate}
          end={endDate}
          handleCheckout={handleCheckout}
        />
      )}
      {isShowing && <ModalOverlay toggle={toggle} />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  trucks: state.trucks,
})

export default connect(mapStateToProps, { getTruck, clearTruck, makeReservation })(
  Checkout
)
