import React from 'react'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { TaskCard } from '../card/TaskCard'

interface TaskColumnProps {
    columnName: string[]
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ columnName }) => {
  return (
    <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap="5%"
        >
          {columnName.map((element) => (
            <Box
              marginTop="20px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="20px"
            >
              <Text fontSize="25px" fontWeight="700">
                {element}
              </Text>
              <Container
                display="flex"
                flexDirection="column"
                border="1px"
                borderColor="gray.200"
                padding="10px"
                gap="5px"
              >
                <TaskCard />
                <TaskCard />
                <TaskCard />
              </Container>
            </Box>
          ))}
        </Flex>
  )
}
