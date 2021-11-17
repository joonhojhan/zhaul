import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from './CheckoutForm'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe(
  'pk_test_51JvziXKFrlW2A37YKTmfeZpUyDOXtwwNJrg2jv1s3I3OCnqqAcJILbDbYuOFwSecPPzmuU3dj59kNjLQCsc6ZlXt00KXmrdlNV'
)

function StripeContainer({
  setShowStripe,
  toggle,
  trucks: { truck },
  start,
  end,
  handleCheckout,
}) {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('https://zhaul.herokuapp.com/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: truck, start, end }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div style={{ zIndex: 10 }}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            setShowStripe={setShowStripe}
            toggle={toggle}
            handleCheckout={handleCheckout}
          />
        </Elements>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  trucks: state.trucks,
})

export default connect(mapStateToProps, null)(StripeContainer)
