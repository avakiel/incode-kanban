import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'src/Redux/hooks'
import { selectTerminalData } from 'src/Redux/terminalReducer'

export const Terminal = () => {
  const terminal = useAppSelector(selectTerminalData)
  const [dotCount, setDotCount] = useState(0)
  const [actions, setActions] = useState<string[]>([])

  useEffect(() => {
    if (terminal.length > 0) {
      setActions((prevActions) => [...prevActions, terminal])
    }
  }, [terminal])

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4)
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      padding='5px'
      height='135px'
      width='100%'
      display="flex"
      marginTop="30px"
      bgColor="black"
      overflow="auto"
      flexDirection="column"
      borderTop="1px solid #576270"
    >
      {actions.map((action, index) => (
        <Box key={index} color="white">
          <Text color='#848d97'>{action}</Text>
        </Box>
      ))}
      <Text color="#848d97">{`waiting for actions${'.'.repeat(Number(dotCount))}`}</Text>
    </Box>
  )
}