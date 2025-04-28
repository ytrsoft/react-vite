import React, { useState, useEffect, useDeferredValue } from 'react'
import { useThrottle } from '../hook'

const Hook = () => {

  const [query, setQuery] = useState('')
  const debouncedQuery = useDeferredValue(query)
  // const [debouncedQuery, setDebouncedQuery] = useState('')
  // const debouncedHandler = useDebounce((newQuery: string) => {
  //   setDebouncedQuery(newQuery)
  // }, 600)

  const [scrollPosition, setScrollPosition] = useState(0)
  const throttledScrollHandler = useThrottle(() => {
    console.log('更新滚动位置', window.scrollY)
    setScrollPosition(window.scrollY)
  }, 600)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    // debouncedHandler(e.target.value)
  }

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler)
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
    }
  }, [throttledScrollHandler])

  const news = Array(100).fill({}).map((_, i) => {
    return { id: i, title: '新闻标题 ' + (i + 1) }
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <label className="text-lg font-semibold">防抖</label>
        <input
          type="text"
          className="p-2 border rounded-lg"
          placeholder="请输入关键字"
          value={query}
          onChange={handleInputChange}
        />
        <p className="text-gray-600">{debouncedQuery}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">节流</h2>
        <p className="text-gray-600">滚动位置: {scrollPosition}px</p>
        {
          news.map((n) => (
            <h1 key={n.id}>{n.title}</h1>
          ))
        }
      </div>
    </div>
  )
}

export default Hook
