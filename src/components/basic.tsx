import React, {
  use,
  useMemo,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useInsertionEffect,
  useCallback,
  useContext
} from 'react'
import { useCounter } from '../hook/task'
import { ThemeContext } from '../hook/theme'

const HookDemo = () => {

  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [count, setCount] = useState(0)
  const [state, dispatch] = useCounter()

  const display = useMemo(() => {
    return `点击次数：${count}`
  }, [count])

  useInsertionEffect(() => {
    document.title = display
  }, [display])

  useLayoutEffect(() => {
    if (btnRef.current) {
      const { width, height } = btnRef.current.getBoundingClientRect()
      console.log('测量信息', width, height)
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 10 * 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [count])

  const handleClick = useCallback(() => setCount(count + 1), [count])

  const useTheme = use(ThemeContext)

  const theme = useContext(ThemeContext)

  return (
    <div className="space-y-2">
      <div>
        <button
          ref={btnRef}
          onClick={handleClick}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          {display}
        </button>
      </div>
      <div>State: { state.count }</div>
      <div>主题: { theme }</div>
      <div>主题: { useTheme }</div>
      <div>
        <button
          onClick={() => dispatch({ type: 'increment' })}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          +
        </button>
      </div>
      <div>
        <button
          onClick={() => dispatch({ type: 'decrement' })}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          -
        </button>
      </div>
    </div>
  )
}

export default React.memo(HookDemo)
