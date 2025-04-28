import { lazy, LazyExoticComponent } from 'react'

export type RouteComponent = LazyExoticComponent<React.ComponentType<any>>

export interface Route {
  id: number,
  path: string
  title: string
  link?: string
  component: RouteComponent
}

export const routes: Array<Route> = [
  {
    id: 0,
    path: '/',
    title: '首页',
    component: lazy(() =>import('../pages/Home'))
  },
  {
    id: 2,
    title: '用户',
    path: '/user',
    component: lazy(() =>import('../pages/User'))
  },
  {
    id: 3,
    title: 'Unstated',
    path: '/unstated',
    component: lazy(() =>import('../pages/Unstated'))
  },
  {
    id: 4,
    title: 'Redux',
    path: '/redux',
    component: lazy(() =>import('../pages/MyRedux'))
  },
  {
    id: 5,
    title: 'Thunk',
    path: '/thunk',
    component: lazy(() =>import('../pages/MyThunk'))
  },
  {
    id: 6,
    title: 'Saga',
    path: '/saga',
    component: lazy(() =>import('../pages/MySaga'))
  },
  {
    id: 7,
    title: 'Hook',
    path: '/hook',
    component: lazy(() =>import('../pages/Hook'))
  },
  {
    id: 8,
    title: 'Transition',
    path: '/transition',
    component: lazy(() =>import('../pages/Transition'))
  },
  {
    id: 9,
    title: 'Form',
    path: '/form',
    component: lazy(() =>import('../pages/Form'))
  },
  {
    id: 10,
    title: 'Optimistic',
    path: '/optimistic',
    component: lazy(() =>import('../pages/Optimistic'))
  },
  {
    id: 11,
    title: '文章',
    path: '/post/:id',
    link: '/post/1024?ver=1.0',
    component: lazy(() =>import('../pages/Post'))
  }
]


