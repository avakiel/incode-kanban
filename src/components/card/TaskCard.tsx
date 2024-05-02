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

  const calcCreatedAt = (date: string) => {
    const createdAt = new Date(date);
    const currentDate = new Date();
    const diff = Math.abs(
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
      Date.UTC(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate())
    );
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? 'today' : days === 1 ? 'day ago' : `${days} days ago`;
  }

  return (
    <Card cursor="pointer" minWidth="400px" bgColor='#0d1117' borderColor='#848d97' border='1px solid'>
      <CardHeader>
        <Heading size="sm" color='#D3D3D3'>{data.title}</Heading>
      </CardHeader>
      <CardBody pt="0">
        <Text color='#848d97'>{`#${data.issueNumber} | Status: ${data.state} | Created: ${calcCreatedAt(data.createdAt)}`}</Text>
        <Box display="flex" flexDirection="row" gap="10px">
          <Link target='_blank' color='#0576ff' href={data.userLink}>{name}</Link>
          <Box color='#848d97' height="100%" width="1px">
            |
          </Box>
          <Link target='_blank' color='#0576ff' href={data.commentsURL}>Comments : {data.commentsCount}</Link>
        </Box>
      </CardBody>
    </Card>
  )
}
