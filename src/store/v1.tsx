import { legacy_createStore as createStore } from 'redux'

// Action type
interface Action {
  type: string
}

export interface State {
  count: number
}

// Action Creators
export const increment = () => ({
  type: 'INCREMENT'
})

export const decrement = () => ({
  type: 'DECREMENT'
})

// initial value
const initialState = {
  count: 0
}

// Reducer
const counterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

// store
export const store = createStore(counterReducer)
