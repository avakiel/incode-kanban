import React, { useEffect, useState } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'src/Redux/hooks'
import {
  cleanIssues,
  fetchIssues,
  selectFetchError,
  setActiveRepo,
  setIssueError,
  setSessionIssues,
} from 'src/Redux/issuesReducer'
import { cleanColumn } from 'src/Redux/columnsReducer'
import { RepoLink } from '../repoLink/RepoLink'

export const Header = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)
  const fetchError = useAppSelector(selectFetchError)

  const dispatch = useAppDispatch()

  // https://github.com/facebook/react
  // https://github.com/kitloong/json-server-vercel
  // https://github.com/vuejs/vue

  const handleSearch = async () => {
    setError(false)

    const path = query.slice('https://github.com/'.length)
    const parts = path.split('/')
    const owner = parts[0]
    const repo = parts[1]
    const sessionKey = `${owner}/${repo}`

    const sessionRepo = sessionStorage.getItem(sessionKey)

    if (query.startsWith('https://github.com/') && !sessionRepo) {
      dispatch(cleanColumn())
      dispatch(cleanIssues())

      dispatch(fetchIssues({ owner: owner, repo: repo }))
      .then(() => {
        if (!fetchError) {
          dispatch(setActiveRepo({ owner: owner, repo: repo }))
        }
      })
      .then(() => dispatch(setIssueError('')))
      .catch(() => setError(true))
    } else if (sessionRepo) {
      dispatch(setSessionIssues(sessionKey))
      dispatch(setActiveRepo({ owner: owner, repo: repo }))
      setError(false)
    } else {
      setQuery('invalid URL. Please try this-->: https://github.com/facebook/react')
      setError(true)
    }
  }

  useEffect(() => {
    if (fetchError) {
      setError(true)
      setQuery(fetchError)
    }
  }, [fetchError])

  return (
    <div>
      <header>
        <Box
          display="flex"
          flexDirection="column"
          gap="30px"
          alignItems="center"
          width="40%"
          margin="0 auto"
        >
          <Text fontSize="50px" fontWeight="700" color="white">
            Incode
          </Text>
          <Stack spacing={4} width="100%" alignSelf="flex-start">
            <InputGroup border="none" size="lg">
              <InputLeftAddon
                border="none"
                bgColor="#576270"
                color="white"
                fontWeight="700"
              >
                URL
              </InputLeftAddon>
              <Input
                bgColor="black"
                border="none"
                color="white"
                fontWeight="400"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                _placeholder={{ fontWeight: '400', color: 'gray.600' }}
                placeholder="Example: https://github.com/nestjs/nest"
                _hover={{ borderColor: 'gray.500' }}
                focusBorderColor="transparent"
              />
              <InputRightAddon
                onClick={handleSearch}
                cursor="pointer"
                border="none"
                bgColor="#576270"
                color="white"
                fontWeight="700"
                _hover={{ bgColor: '#3f4d5b', color: 'gray.300' }}
              >
                Search
              </InputRightAddon>
            </InputGroup>
          </Stack>
          
            <Box alignSelf="flex-start" width="300px" height='20px'>
            {!error &&
              <RepoLink />
            }
            </Box>
         
        </Box>
      </header>
    </div>
  )
}
