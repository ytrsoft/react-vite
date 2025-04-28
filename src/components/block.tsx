import { FC, ReactNode } from 'react'

type Props = {
  label: string,
  children: ReactNode
}

const Block: FC<Props> = ({ label, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-indigo-600">
    <div className="text-2xl font-semibold text-gray-900 mb-4">{label}</div>
    <div className="text-gray-800">
      {children}
    </div>
  </div>
)

export default Block
