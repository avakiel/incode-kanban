import { Global } from '@emotion/react'
import './App.css'
import { Header } from './components/header/Header'
import { TaskColumn } from './components/taskColumn/TaskColumn'
import { Terminal } from './components/terminal/Terminal'
import { css } from '@chakra-ui/react'

function App() {
  const scrollBarCSS = css({
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'gray',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#D3D3D3',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  })

  return (
    <div className="App">
      <Global styles={scrollBarCSS} />
      <Header />
      <TaskColumn />
      <Terminal />
    </div>
  )
}

export default App
