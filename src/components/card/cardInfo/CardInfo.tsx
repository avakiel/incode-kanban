import { Text } from '@chakra-ui/react'
import { IssuesType } from 'src/Types/Types'
import { calcCreatedAt } from 'src/helpers/helpers'

interface CardInfoProps {
  data: IssuesType
}

export const CardInfo: React.FC<CardInfoProps> = ({ data }) => (
  <Text color="#848d97">{`#${data.issueNumber} | Status: ${data.state} | Created: ${calcCreatedAt(
    data.createdAt
  )}`}</Text>
)
