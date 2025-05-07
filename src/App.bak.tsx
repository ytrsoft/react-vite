import { type RouteComponent, routes } from './router'
import { useState, Suspense, FC, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import Loading from './components/loading'

const NotFound = () => (
  <div className="flex justify-center items-center h-full">
    <h1 className="text-4xl text-gray-600">404</h1>
  </div>
)

type CProps = {
  is: RouteComponent
}

const Component: FC<CProps> = ({ is }) => {
  const Warp = is
  return (
    <Suspense fallback={<Loading />}>
      <Warp />
    </Suspense>
  )
}

const App: FC = () => {
  const isHome = useMatch('/')
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(routes[0].id)

  const routeChange = () => {
    const pathname = location.pathname
    const index = routes.findIndex(({ path, link }) => {
      return link === pathname || path === pathname
    })
    setActiveTab(index)
  }

  useEffect(routeChange, [location])

  return (
  <div className="flex flex-col min-h-screen bg-gray-100">
    <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10">
      <div className="container flex items-center">
        <ul className="flex space-x-4">
          {routes.map(({ id, link, path, title }, index) => (
            <li key={id}>
              <Link
                to={link || path}
                className={`${
                  activeTab === index
                    ? 'text-white font-semibold'
                    : 'text-gray-300'
                } hover:text-white transition-colors`}
                onClick={() => setActiveTab(index)}
              >
                {title}
              </Link>
            </li>
          ))}
          <li className="text-red">{isHome && '首页'}</li>
        </ul>
      </div>
    </nav>
    <div className="flex-grow p-4 bg-white mt-10">
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
