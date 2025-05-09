import { nearby } from './api'
import { useQuery } from '@tanstack/react-query'
import { VirtualList } from './components/VirtualList'
import Loading from './components/loading.slot'

const App = () => {

  const { data, isLoading } = useQuery<any>({
    queryKey: ['nearby'],
    queryFn: nearby
  })

  return (
    <div className="w-screen h-screen text-white bg-black">
      <Loading state={isLoading}>
        <VirtualList items={data?.data} />
      </Loading>
    </div>
  )
}

export default App
