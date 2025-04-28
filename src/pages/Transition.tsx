import { useState, useTransition, ChangeEvent } from 'react'
import Loading from '../components/loading'

function Transition() {
  const [inputValue, setInputValue] = useState('')
  const [items] = useState(Array.from({ length: 10000 }, (_, i) => `第${i + 1}个项目`))
  const [filteredItems, setFilteredItems] = useState(items)

  const [isPending, startTransition] = useTransition()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setInputValue(value)
    startTransition(() => {
      const filtered = items.filter(item => item.toLowerCase().includes(value.toLowerCase()))
      setFilteredItems(filtered)
    })
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="请输入"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isPending && (
        <Loading />
      )}
      <ul className="mt-4">
        {filteredItems.map((item, index) => (
          <li key={index} className="p-2 border-b border-gray-200">{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Transition
