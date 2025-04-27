import useRequest from '../hook/request'
import Loading from '../components/loading'


const User = () => {
  const { data, loading } = useRequest('/api/users')

  if (loading) {
    return (<Loading />)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((user: any) => (
          <div
            key={user.id}
            className="bg-white bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md border border-gray-200 hover:bg-gradient-to-b hover:from-blue-50 hover:to-blue-100 hover:shadow-xl hover:border-blue-300 transform hover:scale-102 transition-all duration-300"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-600 mb-2">{user.name}</h2>
              <div className="text-gray-600">
                <p>年龄：{user.age}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 p-4">
              <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                用户ID: {user.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default User
