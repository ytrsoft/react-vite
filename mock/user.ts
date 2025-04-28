import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const userList = Mock.mock({
  'list|72': [
    {
      'id|+1': 1,
      name: '@cname',
      age: '@integer(18, 60)',
      email: '@email'
    }
  ]
})

const userMock: MockMethod[] = [
  {
    url: '/api/users',
    method: 'get',
    response: () => ({
      code: 200,
      message: 'success',
      data: userList.list
    })
  }
]

export default userMock
