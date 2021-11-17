import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './Stripe.css'

export default function CheckoutForm({ setShowStripe, toggle, handleCheckout }) {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000',
      },
    })

    if (!error) {
      handleCheckout()
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    setIsLoading(false)
  }

  return (
    <div
      className="bg-white rounded-md"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
      }}
    >
      <form
        style={{
          height: '100%',
          minHeight: '350px',
          maxheight: '600px',
          width: '30vw',
          minWidth: '500px',
          alignSelf: 'center',
          boxShadow:
            '0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
          borderRadius: '7px',
          padding: '40px',
          paddingBottom: '70px',
        }}
        onSubmit={handleSubmit}
      >
        <PaymentElement id="payment-element" />
        <button
          className="float-left"
          style={{
            background: '#5469d4',
            fontFmaily: 'Arial, sans-serif',
            color: '#ffffff',
            borderRadius: '4px',
            border: '0',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'block',
            transition: 'all 0.2s ease',
            boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
            width: '40%',
          }}
          onClick={() => {
            setShowStripe(false)
            toggle()
          }}
        >
          Cancel
        </button>
        <button
          className="float-right"
          style={{
            background: '#5469d4',
            fontFmaily: 'Arial, sans-serif',
            color: '#ffffff',
            borderRadius: '4px',
            border: '0',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'block',
            transition: 'all 0.2s ease',
            boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
            width: '40%',
          }}
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  )
}
