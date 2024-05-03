import { Container, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'src/Redux/hooks'
import { selectActiveRepo } from 'src/Redux/issuesReducer'
import { fetchRepoStars } from 'src/fetchClient'
import { RepoOwnerLink } from './repoOwnerLink/RepoOwnerLink'
import { RepoName } from './repoName/RepoName'
import { RepoStars } from './repoStars/RepoStars'

export const RepoLink = () => {
  const activeLink = useAppSelector(selectActiveRepo);
  const [repoStars, setRepoStars] = useState<number>(0);

  useEffect(() => {
    if (!activeLink) return;
    fetchRepoStars(activeLink?.owner, activeLink?.repo).then((data) => {
      setRepoStars(data);
    });
  }, [activeLink]);

  return (
    <>
      {activeLink ? (
        <Container display="flex" gap="10px" alignItems='center' color='#0576ff' fontWeight='700'>
          <RepoOwnerLink owner={activeLink.owner} />
          <Text>&gt;</Text>
          <RepoName owner={activeLink.owner} repo={activeLink.repo} />
          <RepoStars stars={repoStars} />
        </Container>
      ) : null}
    </>
  );
}
