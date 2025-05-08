import React from 'react'

type NearbyItem = {
  id: number
  user: string
  content: string
  image: string
  timestamp: string
}

type Props = {
  data?: NearbyItem[]
  loading: boolean
}

const NearbyList: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return <p className="text-center text-gray-500">加载中...</p>
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-400">暂无动态</p>
  }

  return (
    <div className="space-y-6">
      {data.map(item => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-500">
              {item.user.slice(0, 1)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{item.user}</h2>
              <p className="text-sm text-gray-400">
                发布于 {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-3 leading-relaxed">{item.content}</p>

          <img
            src={item.image}
            alt="动态图片"
            className="rounded-xl w-full max-w-md object-cover transition hover:scale-105 duration-300"
          />
        </div>
      ))}
    </div>
  )
}

export default NearbyList
