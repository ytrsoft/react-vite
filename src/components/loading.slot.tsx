import { FC, ReactNode } from 'react'

type Props = {
  state: boolean
  children?: ReactNode
}

const Loading: FC<Props> = ({ children, state }) => (
  <>
    {
      state ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin border-white"></div>
        </div>
      ) : (
        <div className="p-4">
          { children }
        </div>
      )
    }
  </>
)

export default Loading
