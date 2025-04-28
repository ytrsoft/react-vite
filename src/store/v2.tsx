import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { thunk } from 'redux-thunk'

// Action Creators
export const fetchUsersRequest = () => ({
  type: 'FETCH_USERS_REQUEST',
  payload: undefined,
})

export const fetchUsersSuccess = (users: any) => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: users,
})

export const fetchUsersFailure = (error: any) => ({
  type: 'FETCH_USERS_FAILURE',
  payload: error,
})

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
}

// Action type
interface Action {
  type: string
  payload: any
}

// Reducer
const counterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload,
      }
    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Apply redux-thunk middleware to the store
export const store = createStore(counterReducer, applyMiddleware(thunk))

// RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>
export type UserDispatch = ThunkDispatch<RootState, unknown, Action>

// Thunk action
export const fetchUsers = (): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch: UserDispatch) => {
    dispatch(fetchUsersRequest())
    try {
      const response = await fetch('/api/users')
      const { data } = await response.json()
      dispatch(fetchUsersSuccess(data))
    } catch (error: any) {
      dispatch(fetchUsersFailure(error.message))
    }
  }
}
