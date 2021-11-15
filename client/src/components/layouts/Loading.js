import React, { Fragment } from 'react'
import spinner from '../../resources/spinner.gif'

export const Loading = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '50px', margin: 'auto' }}
        alt="Loading..."
      />
    </Fragment>
  )
}
