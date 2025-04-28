import { useState, createRef, useEffect } from 'react'
import Block from '../components/block'
import UseBasicDemo from '../components/useBasicDemo'
import { TextField, TextFieldRef } from '../components/textfield'
import { ThemeContext } from '../hook/theme'

const Home = () => {
  const tf = createRef<TextFieldRef>()
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    if (tf.current) {
      tf.current.focus()
    }
  }, [])
  return (
    <ThemeContext value={theme}>
      <div className="py-2 space-y-2">
        <Block label={'基本Hook'}>
          <UseBasicDemo />
        </Block>
        <Block label={'切换主题'}>
          <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            切换
          </button>
        </Block>
        <Block label={'自定义输入框'}>
          <TextField ref={tf} label="姓名" />
        </Block>
      </div>
    </ThemeContext>
  )
}

export default Home
