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
  // {
  //   id: 3,
  //   title: '文章',
  //   path: '/post/:id',
  //   link: '/post/1024',
  //   component: () => import('../pages/Post')
  // }
]


