import { Box, Container, Image, Link, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'src/Redux/hooks'
import { selectActiveRepo } from 'src/Redux/issuesReducer'
import { fetchRepoStars } from 'src/fetchClient'

export const RepoLink = () => {
  const activeLink = useAppSelector(selectActiveRepo)
  const [repoStars, setRepoStars] = useState<number>(0)

  useEffect(() => {
    if (!activeLink) return
    fetchRepoStars(activeLink?.owner, activeLink?.repo).then((data) => {
      setRepoStars(data)
    })
  }, [activeLink])

  function formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k' + ' ' + 'Stars'
    } else {
      return num.toString()
    }
  }

  return (
    <>
      {activeLink ? (
        <Container display="flex" gap="10px" alignItems='center' color='#0576ff' fontWeight='700'>
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
            <Image src='/star.png' alt='star' width='20px' height='20px' />
          <Box>{formatNumber(repoStars)}</Box>
        </Container>
      ) : null}
    </>
  )
}
