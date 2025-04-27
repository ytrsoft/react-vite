import { DynamicComponent, routes } from './router'
import { useState, lazy, Suspense, FC, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

const Loading = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center z-50">
    <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin border-gray-600"></div>
  </div>
)

const NotFound = () => (
  <div className="flex justify-center items-center h-full">
    <h1 className="text-4xl text-gray-600">404</h1>
  </div>
)

type CProps = {
  is: DynamicComponent
}

const Component: FC<CProps> = ({ is }) => {
  const Warp = lazy(is)
  return (
    <Suspense fallback={<Loading />}>
      <Warp />
    </Suspense>
  )
}

const App: FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(routes[0].id)

  const routeChange = () => {
    const pathname = location.pathname
    const index = routes.findIndex(({path, link}) => {
      return link === pathname || path === pathname
    })
    setActiveTab(index)
  }

  useEffect(routeChange, [location])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-gray-800 p-4">
        <div className="container flex items-center">
          <ul className="flex space-x-4">
            {routes.map(({ id, link, path, title }) => (
              <li key={id}>
                <Link
                  to={link || path}
                  className={`${
                    activeTab === id
                      ? 'text-white font-semibold'
                      : 'text-gray-300'
                  } hover:text-white transition-colors`}
                  onClick={() => setActiveTab(id)}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="flex-grow p-4 bg-white">
        <Routes>
          {routes.map(({ id, path, component }) => (
            <Route
              key={id}
              path={path}
              element={<Component is={component} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
