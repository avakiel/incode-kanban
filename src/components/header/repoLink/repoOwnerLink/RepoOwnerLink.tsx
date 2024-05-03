import { Link } from '@chakra-ui/react';

interface RepoOwnerLinkProps {
  owner: string;
}

export const RepoOwnerLink: React.FC<RepoOwnerLinkProps> = ({ owner }) => (
  <Link href={`https://github.com/${owner}`} target="_blank">{owner}</Link>
);