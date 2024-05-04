import React, { useState } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'src/Redux/hooks'
import { selectFetchError, setActiveRepo, setSessionIssues } from 'src/Redux/issuesReducer'
import { cleanColumn } from 'src/Redux/columnsReducer'
import { RepoLink } from './repoLink/RepoLink'
import { useFetchError } from 'src/helpers/useFetchError'
import { parseGithubUrl } from 'src/helpers/helpers'
import { SearchInput } from './input/InputSearch'
import { INVALID_URL } from 'src/helpers/errors'
import { GITHUB_HOST } from 'src/helpers/constants'

export const Header = () => {
  const [githubUrl, setGithubUrl] = useState('')
  const fetchError = useAppSelector(selectFetchError)
  const error = useFetchError(fetchError)

  const dispatch = useAppDispatch()

  const handleSearch = async () => {
    const { owner, repo } = parseGithubUrl(githubUrl)
    const sessionKey = `${owner}/${repo}`
    const sessionRepo = sessionStorage.getItem(sessionKey)

    if (githubUrl.startsWith(GITHUB_HOST) && !sessionRepo) {
      dispatch(cleanColumn())
      dispatch(setSessionIssues(null))
      
      dispatch(setActiveRepo({ owner, repo }))
    } else if (sessionRepo) {
      dispatch(setSessionIssues(sessionKey))
      dispatch(setActiveRepo({ owner, repo }))
    } else {
      setGithubUrl(INVALID_URL)
    }
  }

  return (
    <div>
      <header>
        <Box
          display="flex"
          flexDirection="column"
          gap="10px"
          alignItems="center"
          width="40%"
          margin="0 auto"
          height="30%"
        >
          <Text fontSize="50px" fontWeight="700" color="white">
            Incode
          </Text>

          <Stack spacing={4} width="100%" alignSelf="flex-start">
            <SearchInput
              value={githubUrl}
              onChange={(event) => setGithubUrl(event.target.value)}
              onSearch={handleSearch}
            />
          </Stack>

          <Box alignSelf="flex-start" width="300px" height="20px">
            {!error && <RepoLink setError={setGithubUrl} />}
          </Box>
        </Box>
      </header>
    </div>
  )
}
