import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from 'src/Redux/hooks'
import { selectTerminalData } from 'src/Redux/terminalReducer'

export const Terminal = () => {
  const terminal = useAppSelector(selectTerminalData)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [dotCount, setDotCount] = useState(0)
  const [actions, setActions] = useState<string[]>([])

  useEffect(() => {
    if (terminal.length > 0) {
      setActions((prevActions) => [...prevActions, terminal])
    }
  }, [terminal])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [actions])

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4)
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      display="flex"
      marginTop="30px"
      height="200px"
      bgColor="black"
      overflow="auto"
      flexDirection="column"
      borderTop="1px solid #576270"
    >
      {actions.map((action, index) => (
        <Box key={index} color="white">
          <Text color='#576270'>{action}</Text>
        </Box>
      ))}
      <Text color="green.500">{`waiting for actions${'.'.repeat(Number(dotCount))}`}</Text>
      <div ref={bottomRef} />
    </Box>
  )
}