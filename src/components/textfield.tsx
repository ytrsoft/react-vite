import { useId, useRef, forwardRef, useImperativeHandle } from 'react'

type Props = {
  label: string
}

export interface TextFieldRef {
  focus: () => void
}

export const TextField = forwardRef<TextFieldRef, Props>(({ label }, ref) => {
  const id = useId()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      },
    }
  })

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
      />
    </div>
  )
})
