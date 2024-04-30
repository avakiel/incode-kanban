import { Box, Container, Link, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'src/Redux/hooks'
import { selectActiveRepo } from 'src/Redux/issuesReducer'
import { fetchRepoStars } from 'src/fetchClient'

export const RepoLink = () => {
  const activeLink = useAppSelector(selectActiveRepo)
    const [repoStars, setRepoStars] = useState<number>(0)

    useEffect(() => {
        if (!activeLink) return;
        fetchRepoStars(activeLink?.owner, activeLink?.repo)
        .then((data) => {
            setRepoStars(data)
        })
    }, [activeLink])

    console.log('repoStars:', repoStars)


  return (
    <>
      {activeLink ? (
        <Container display="flex" gap='10px'>
          <Link
            href={`https://github.com/${activeLink?.owner}`}
            target="_blank"
          >
            {activeLink?.owner}
          </Link>
          <Text>&gt;</Text>
          <Link
            href={`https://github.com/${activeLink?.owner}/${activeLink?.repo}`}
            target="_blank"
          >
            {activeLink?.repo}
          </Link>
          <Box>{repoStars}</Box>
        </Container>
      ) : null}
    </>
  )
}
