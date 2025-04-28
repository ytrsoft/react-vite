import { Provider, useSelector, useDispatch } from 'react-redux'
import { State, store, increment, decrement } from '../store/v1'


const Child = () => {
  const dispatch = useDispatch()
  const count = useSelector((state: State) => state.count)
  return (
    <div className="py-2 space-y-2">
      <h1>State: { count }</h1>
      <div>
        <button
          onClick={() => dispatch(increment())}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          +
        </button>
      </div>
      <div>
        <button
          onClick={() => dispatch(decrement())}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          -
        </button>
      </div>
    </div>
  )
}


const MyRedux = () => {
  return (
    <Provider store={store}>
      <Child />
    </Provider>
  )
}

export default MyRedux
