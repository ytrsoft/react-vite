import { Container } from '../store/v0'

const Child = () => {
  let counter = Container.useContainer()
  return (
    <div className="py-2 space-y-2">
      <h1>State: {counter.state}</h1>
      <div>
        <button
          onClick={counter.increment}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          +
        </button>
      </div>
      <div>
        <button
          onClick={counter.decrement}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          -
        </button>
      </div>
    </div>
  )
}


const Unstated = () => {
  return (
    <Container.Provider initialState={99}>
      <Child />
    </Container.Provider>
  )
}

export default Unstated
