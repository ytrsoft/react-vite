import { nearby } from './api'
import { useQuery } from '@tanstack/react-query'
import VirtualList from './components/VirtualList'

const App = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ['nearby'],
    queryFn: nearby
  })

  return (
    <div className="w-screen h-screen">
      <div className="h-full flex flex-col p-4">
        <h1 className="flex-none text-3xl font-bold mb-4">附近动态</h1>
        {isLoading ? (
          <p className="text-center text-gray-500">加载中...</p>
        ) : (
          <div className="flex-1 p-4">
            <VirtualList items={data?.data || []} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
