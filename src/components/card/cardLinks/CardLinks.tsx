import { Box, Link } from '@chakra-ui/react';
import { IssuesType } from 'src/Types/Types';

interface CardLinksProps {
  data: IssuesType;
  name: string;
}

export const CardLinks: React.FC<CardLinksProps> = ({ data, name }) => (
  <Box display="flex" flexDirection="row" gap="10px">
    <Link target='_blank' color='#0576ff' href={data.userLink}>{name}</Link>
    <Box color='#848d97' height="100%" width="1px">|</Box>
    <Link target='_blank' color='#0576ff' href={data.commentsURL}>Comments : {data.commentsCount}</Link>
  </Box>
);