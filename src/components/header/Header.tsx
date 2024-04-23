import React from 'react'
import { Box, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text } from '@chakra-ui/react';


export const Header = () => {
  return (
    <div>
      <header>
        <Box display='flex' flexDirection='column' gap='30px' alignItems='center'>
            <Text marginTop='20px' fontSize='50px' fontWeight='700'>Incode</Text>
        <Stack spacing={4} width='80%'>
          <InputGroup size="lg">
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="Enter repo..." />
            <InputRightAddon cursor='pointer'>Search</InputRightAddon>
          </InputGroup>
        </Stack>
        </Box>
      </header>
    </div>
  )
}
