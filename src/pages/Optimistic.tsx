import { v4 as uuid } from 'uuid'
import { useState, useOptimistic, startTransition } from 'react'

type Todo = {
  id: string
  text: string
}


const Optimistic = () => {

  const [todos, setTodos] = useState<Todo[]>([
    { id: uuid(), text: '学习React' }
  ])

  const [input, setInput] = useState('')

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => {
      return state.concat(newTodo)
    }
  )

  const addTodo = async (text: string) => {
    const todo = { id: uuid(), text }
    // 在 startTransition 中调用乐观更新
    startTransition(() => {
      addOptimisticTodo(todo)
      setInput('')
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTodos((prev) => prev.concat(todo))
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">代办中心</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="代办列表"
        />
        <button
          onClick={() => addTodo(input)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          添加
        </button>
      </div>

      <ul className="space-y-2">
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className="p-2 border rounded">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Optimistic
