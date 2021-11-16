import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeReservation } from '../../actions/reservations'
import SelectDatetimeType from './SelectDatetimeType'
import SelectTruck from './SelectTruck'
import Checkout from './Checkout'

const Reserve = ({ setActiveTab }) => {
  const [steps, setSteps] = useState([
    { name: 'Select date & time', completed: false, current: true },
    { name: 'Choose a truck', completed: false, current: false },
    { name: 'Checkout', completed: false, current: false },
  ])

  const [currentStepIdx, setCurrentStepIdx] = useState(0)

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [type, setType] = useState('all')
  const [truckId, setTruckId] = useState(null)

  const handleStepsForward = (e) => {
    e.preventDefault()
    let copy = [...steps]
    for (let i = currentStepIdx + 1; i >= 0; i--) {
      if (i === currentStepIdx + 1) {
        copy[i].current = true
        copy[i].completed = false
      } else {
        copy[i].current = false
        copy[i].completed = true
      }
    }
    setCurrentStepIdx(currentStepIdx + 1)
    setSteps(copy)
  }

  const handleStepsBack = (e) => {
    e.preventDefault()
    let copy = [...steps]
    for (let i = currentStepIdx - 1; i < steps.length; i++) {
      if (i === currentStepIdx - 1) {
        copy[i].current = true
        copy[i].completed = false
      } else {
        copy[i].current = false
        copy[i].completed = false
      }
    }
    setCurrentStepIdx(currentStepIdx - 1)
    setSteps(copy)
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-6">
      <div className="md:flex md:items-center md:justify-between pb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Reserve a Truck
          </h2>
        </div>
      </div>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((step, idx) => {
            if (step.current) {
              return (
                <li key={idx} className="relative md:flex-1 md:flex">
                  {/* <!-- Current Step --> */}
                  <span className="px-6 py-4 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-cyan-500 rounded-full">
                      <span className="text-cyan-500">{`0${idx + 1}`}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-cyan-500">
                      {step.name}
                    </span>
                  </span>

                  {/* <!-- Arrow separator for lg screens and up --> */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-0 right-0 h-full w-5">
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </li>
              )
            } else if (step.completed) {
              return (
                <li key={idx} className="relative md:flex-1 md:flex">
                  {/* <!-- Completed Step --> */}
                  <span className="group flex items-center w-full">
                    <span className="px-6 py-4 flex items-center text-sm font-medium">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-500 rounded-full group-hover:bg-cyan-600">
                        {/* <!-- Heroicon name: solid/check --> */}
                        <svg
                          className="w-6 h-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </span>

                  {/* <!-- Arrow separator for lg screens and up --> */}
                  {idx < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-0 right-0 h-full w-5"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </li>
              )
            } else {
              return (
                <li key={idx} className="relative md:flex-1 md:flex">
                  {/* <!-- Upcoming Step --> */}
                  <span className="group flex items-center">
                    <span className="px-6 py-4 flex items-center text-sm font-medium">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        <span className="text-gray-500 group-hover:text-gray-900">
                          {`0${idx + 1}`}
                        </span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </span>
                  {idx < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-0 right-0 h-full w-5"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </li>
              )
            }
          })}
        </ol>
      </nav>

      {currentStepIdx === 0 && (
        <SelectDatetimeType
          handleStepsForward={handleStepsForward}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          type={type}
          setType={setType}
          setTruckId={setTruckId}
        />
      )}
      {currentStepIdx === 1 && (
        <SelectTruck
          startDate={startDate}
          endDate={endDate}
          handleStepsForward={handleStepsForward}
          handleStepsBack={handleStepsBack}
          truckId={truckId}
          setTruckId={setTruckId}
          type={type}
          setType={setType}
        />
      )}
      {currentStepIdx === 2 && (
        <Checkout
          handleStepsBack={handleStepsBack}
          startDate={startDate}
          endDate={endDate}
          truckId={truckId}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  trucks: state.trucks,
})

export default connect(mapStateToProps, { makeReservation })(Reserve)
