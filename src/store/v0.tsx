import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useCounter = (initState = 0) => {
  const [state, setState] = useState(initState)
  const increment = () => {
    setState(state + 1)
  }
  const decrement = () => {
    setState(state - 1)
  }
  return { state, increment, decrement }
}


export const Container = createContainer(useCounter)
