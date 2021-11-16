import React, { useEffect } from 'react'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'

const SelectDatetimeType = ({
  handleStepsForward,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  type,
  setType,
  setTruckId,
}) => {
  useEffect(() => {
    setType('all')
    setTruckId(null)
  }, [])

  const types = ['all', 'compact', 'mid-size', 'full-size', 'heavy-duty']

  return (
    <div className="pt-6">
      <div className="text-lg">Select a start and end time:</div>
      <div>
        <DateRangePicker
          defaultValue={startDate && endDate ? [startDate, endDate] : null}
          disabledDate={DateRangePicker.beforeToday()}
          ranges={[]}
          format="yyyy-MM-dd HH:mm"
          onOk={(date) => {
            const [start, end] = date
            setStartDate(start)
            setEndDate(end)
          }}
        />
      </div>
      <div className="text-lg pt-6">Select truck type:</div>
      <div>
        <select
          id="type"
          name="type"
          className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
          onChange={(e) => setType(e.target.value)}
        >
          {types.map((el) => {
            return (
              <option key={el} value={el} checked={type === el}>
                {el}
              </option>
            )
          })}
        </select>
      </div>

      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 float-right"
        onClick={(e) => {
          if (!startDate || !endDate) {
            alert(
              'Please select a start date/time and end date/time before moving on!'
            )
          } else if (!type) {
            alert('Please select a truck type before moving on!')
          } else {
            handleStepsForward(e)
          }
        }}
      >
        Choose a truck
      </button>
    </div>
  )
}
export default SelectDatetimeType
