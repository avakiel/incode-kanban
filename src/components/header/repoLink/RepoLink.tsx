import { Container, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/Redux/hooks'
import { selectActiveRepo, setActiveRepo } from 'src/Redux/issuesReducer'
import { fetchRepoStars } from 'src/fetchClient'
import { RepoOwnerLink } from './repoOwnerLink/RepoOwnerLink'
import { RepoName } from './repoName/RepoName'
import { RepoStars } from './repoStars/RepoStars'
import { GITHUB_HOST } from 'src/helpers/constants'

interface RepoLinkProps {
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const RepoLink: React.FC<RepoLinkProps> = ({ setError }) => {
  const activeLink = useAppSelector(selectActiveRepo)
  const [repoStars, setRepoStars] = useState<number>(0)
  const dispatch = useAppDispatch()

  const fetchStars = async () => {
    if (!activeLink) return
    const data = await fetchRepoStars(activeLink.owner, activeLink.repo)
    
    if (!data) {
      setError(`Check your URL -> "${GITHUB_HOST}${activeLink.owner}/${activeLink.repo}" `)
      dispatch(setActiveRepo(null))
      return
    }
    setRepoStars(data)
  }

  useEffect(() => {
    fetchStars()
  }, [activeLink])

  return (
    <>
      {activeLink ? (
        <Container display="flex" gap="10px" alignItems="center" color="#0576ff" fontWeight="700">
          <RepoOwnerLink owner={activeLink.owner} />
          <Text>&gt;</Text>
          <RepoName owner={activeLink.owner} repo={activeLink.repo} />
          <RepoStars stars={repoStars} />
        </Container>
      ) : null}
    </>
  )
}
