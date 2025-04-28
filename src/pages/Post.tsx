import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

const User = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const ver = searchParams.get('ver')
  const goUser = () => {
    navigate('/user')
  }
  return (
    <div className="p-4 space-y-4">
      <h1>ID: { id }</h1>
      <h1>VER: { ver }</h1>
      <h1>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          回退
        </button>
      </h1>
      <h1>
        <button
          onClick={goUser}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300">
          用户列表
        </button>
      </h1>
    </div>
  )
}

export default User
