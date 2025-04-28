import { useActionState, useEffect } from 'react'

interface FormState {
  error: string | null
  success: boolean
  message: string
}

const loginAction = async (_: FormState, formData: FormData): Promise<FormState> => {
  try {
    const username = formData.get('username') as string | null
    const password = formData.get('password') as string | null

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!username || !password) {
      return { error: 'Username and password are required', success: false, message: '' }
    }

    if (username === 'root' && password === 'root') {
      return { success: true, message: `欢迎回来, ${username}!`, error: null }
    }

    return { error: '用户/密码错误', success: false, message: '' }
  } catch (error: any) {
    return { error: error.message, success: false, message: '' }
  }
}

const LoginForm: React.FC = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
    message: '',
  })

  useEffect(() => {
    if (state.success) {
      console.log('登录成功', state.message)
    }
  }, [state])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">登录系统</h1>
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              账号
            </label>
            <input
              type="text"
              id="username"
              name="username"
              disabled={isPending}
              placeholder="请输入账号"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              disabled={isPending}
              placeholder="请输入密码"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>
          {state.error && (
            <p className="rounded-md bg-red-100 p-2 text-sm text-red-600">{state.error}</p>
          )}
          {state.success && (
            <p className="rounded-md bg-green-100 p-2 text-sm text-green-600">{state.message}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {isPending ? '登陆中...' : '立即登录'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
