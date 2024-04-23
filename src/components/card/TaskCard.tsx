import { CardBody, Card, CardHeader, Heading, Text, Box, Divider } from '@chakra-ui/react'
import React from 'react'

export const TaskCard = () => {
  return (
    <Card cursor='pointer'>
      <CardHeader>
        <Heading size="md"> Customer dashboard</Heading>
      </CardHeader>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
        <Box display='flex' flexDirection="row">
          <Text>admin</Text>
          <Divider />
          <Text>Commnets</Text>
        </Box>
      </CardBody>
    </Card>
  )
}
