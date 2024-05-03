import { Box, Image } from '@chakra-ui/react';
import { formatNumber } from 'src/helpers/helpers';


interface RepoStarsProps {
  stars: number;
}

export const RepoStars: React.FC<RepoStarsProps> = ({ stars }) => (
  <>
    <Image src='/star.png' alt='star' width='20px' height='20px' />
    <Box>{formatNumber(stars)}</Box>
  </>
);