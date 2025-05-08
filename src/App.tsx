import { nearby } from './api'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ['nearby'],
    queryFn: nearby
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          附近动态
        </h1>

        {isLoading && (
          <div className="text-center text-gray-500">加载中...</div>
        )}

        {data?.data?.length > 0 ? (
          <div className="space-y-6">
            {data.data.map((item: any) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-500">
                    {item.user.slice(0, 1)}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.user}
                    </h2>
                    <p className="text-sm text-gray-400">
                      发布于 {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-3 leading-relaxed">
                  {item.content}
                </p>

                <img
                  src={item.image}
                  alt="动态图片"
                  className="rounded-xl w-full max-w-md object-cover transition hover:scale-105 duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">暂无动态</p>
        )}
      </div>
    </div>
  )
}

export default App
