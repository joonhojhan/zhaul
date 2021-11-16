import { useState } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  const toggle = () => {
    setIsShowing(!isShowing)
  }

  const html = document.querySelector('html')
  const body = document.querySelector('body')

  if (isShowing) {
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
  } else {
    html.style.overflow = ''
    body.style.overflow = ''
  }

  return {
    isShowing,
    toggle,
  }
}

export default useModal
