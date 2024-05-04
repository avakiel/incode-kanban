import { Global } from '@emotion/react'
import './App.css'
import { Header } from './components/header/Header'
import { TaskColumn } from './components/taskColumn/TaskColumn'
import { Terminal } from './components/terminal/Terminal'
import { Box, Image, Tooltip, css } from '@chakra-ui/react'

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

  const cleanSessionStorage = () => {
    sessionStorage.clear()
  }

  return (
    <div className="App">
      <Tooltip label="Clear session storage" fontSize="md">
      <Box
        as="span"
        position="absolute"
        top="5"
        right="5"
        cursor="pointer"
        _hover={{
          filter: 'drop-shadow(0 0 0.5rem blue)',
        }}
      >
        <Image onClick={cleanSessionStorage} src="./trash.png" alt="logo" width="25px" height="25px" />
      </Box>
    </Tooltip>
      <Global styles={scrollBarCSS} />
      <Header />
      <TaskColumn />
      <Terminal />
    </div>
  )
}

export default App
