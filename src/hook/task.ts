import { useReducer } from 'react'


type Action = { type: 'increment' } | { type: 'decrement' }

type State = {
  count: number
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

export const useCounter = () => {
  return useReducer(reducer, { count: 0 })
}


