import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { takeEvery, call, put, all, Effect } from 'redux-saga/effects'

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

export type RootState = ReturnType<typeof store.getState>

// Saga Middleware
const sagaMiddleware = createSagaMiddleware()

// API Call
const fetchUsersFromApi = async (): Promise<any> => {
  const response = await fetch('/api/users')
  const data = await response.json()
  return data
}

// Saga Worker
function* fetchUsersSaga(): Generator<Effect, void, any> {
  try {
    const data: any = yield call(fetchUsersFromApi)
    yield put(fetchUsersSuccess(data))
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message))
  }
}

// Saga Watcher
function* watchFetchUsers() {
  yield takeEvery('FETCH_USERS_REQUEST', fetchUsersSaga)
}

function* rootSaga() {
  yield all([watchFetchUsers()])
}

sagaMiddleware.run(rootSaga)

// Apply redux-thunk middleware to the store
export const store = createStore(counterReducer, applyMiddleware(sagaMiddleware))


