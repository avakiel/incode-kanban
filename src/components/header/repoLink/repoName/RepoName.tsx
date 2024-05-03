import { Link } from '@chakra-ui/react';

interface RepoNameProps {
  owner: string;
  repo: string;
}

export const RepoName: React.FC<RepoNameProps> = ({ owner, repo }) => (
  <Link href={`https://github.com/${owner}/${repo}`} target="_blank">{repo}</Link>
);