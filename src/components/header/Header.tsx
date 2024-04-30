import React, { useState } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAppDispatch } from 'src/Redux/hooks'
import {
  cleanIssues,
  fetchIssues,
  setActiveRepo,
  setSessionIssues,
} from 'src/Redux/issuesReducer'
import { cleanColumn } from 'src/Redux/columnsReducer'
import { RepoLink } from '../repoLink/RepoLink'

export const Header = () => {
  const [query, setQuery] = useState('')

  const dispatch = useAppDispatch()

  // https://github.com/facebook/react
  // https://github.com/kitloong/json-server-vercel
  // https://github.com/vuejs/vue

  const handleSearch = async () => {
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
      dispatch(setActiveRepo({ owner: owner, repo: repo }))
    } else if (sessionRepo) {
      dispatch(setSessionIssues(sessionKey))
      dispatch(setActiveRepo({ owner: owner, repo: repo }))
    } else {
      setQuery('invalid URL')
    }
  }

  return (
    <div>
      <header>
        <Box
          display="flex"
          flexDirection="column"
          gap="30px"
          alignItems="center"
          width='800px'
          margin='0 auto'
        >
          <Text marginTop="20px" fontSize="50px" fontWeight="700">
            Incode
          </Text>
          <Stack spacing={4} width="100%" alignSelf='flex-start'>
            <InputGroup size="lg">
              <InputLeftAddon>URL</InputLeftAddon>
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter repo..."
              />
              <InputRightAddon onClick={handleSearch} cursor="pointer">
                Search
              </InputRightAddon>
            </InputGroup>
          </Stack>
          {<Box alignSelf="flex-start">
            <RepoLink />
          </Box>}
        </Box>
      </header>
    </div>
  )
}
