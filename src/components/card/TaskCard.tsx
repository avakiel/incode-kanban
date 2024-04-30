import {
  CardBody,
  Card,
  CardHeader,
  Heading,
  Text,
  Box,
  Link,
} from '@chakra-ui/react'
import React from 'react'
import { IssuesType } from 'src/Types/Types'

interface TaskCardProps {
  data: IssuesType
}

export const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
  const githubUrl = data.userLink
  const parts = githubUrl.split('/')
  const name = parts[parts.length - 1]

  return (
    <Card cursor="pointer" minWidth="400px">
      <CardHeader>
        <Heading size="sm">{data.title}</Heading>
      </CardHeader>
      <CardBody pt="0">
        <Text>{`#${data.issueNumber} ${data.state}`}</Text>
        <Box display="flex" flexDirection="row" gap="10px">
          <Link href={data.userLink}>{name}</Link>
          <Box height="100%" width="1px">
            |
          </Box>
          <Link href={data.commentsURL}>Comments : {data.commentsCount}</Link>
        </Box>
      </CardBody>
    </Card>
  )
}
