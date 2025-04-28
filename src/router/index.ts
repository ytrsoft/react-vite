export type DynamicComponent = () => Promise<{ default: React.ComponentType }>

export interface Route {
  id: number,
  path: string
  title: string
  link?: string
  component: DynamicComponent
}

export const routes: Array<Route> = [
  {
    id: 0,
    path: '/',
    title: '首页',
    component: () => import('../pages/Home')
  },
  {
    id: 2,
    title: '用户',
    path: '/user',
    component: () => import('../pages/User')
  },
  {
    id: 3,
    title: 'Unstated',
    path: '/unstated',
    component: () => import('../pages/Unstated')
  },
  {
    id: 4,
    title: 'Redux',
    path: '/redux',
    component: () => import('../pages/MyRedux')
  },
  {
    id: 5,
    title: 'Thunk',
    path: '/thunk',
    component: () => import('../pages/MyThunk')
  },
  {
    id: 6,
    title: 'Saga',
    path: '/saga',
    component: () => import('../pages/MySaga')
  },
  {
    id: 7,
    title: '文章',
    path: '/post/:id',
    link: '/post/1024',
    component: () => import('../pages/Post')
  }
]


