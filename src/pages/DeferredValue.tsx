import { useState, useDeferredValue, FC } from 'react'

type Props = {
  text: string
}

const Item: FC<Props> = ({ text }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // 模拟极其缓慢的代码
  }
  return <li className="px-4 py-2 border-b border-gray-200">{text}</li>
}

const List: FC<Props> = ({ text }) => {
  let items = []
  for (let i = 0; i < 200; i++) {
    items.push(<Item key={i} text={text} />)
  }
  return <ul className="items border border-gray-200 rounded-md overflow-hidden">{items}</ul>
}

const DeferredValue = () => {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)

  return (
    <div className="py-8">
      <input
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入内容"
      />
      <List text={deferredText} />
    </div>
  )
}

export default DeferredValue
