import { InputGroup, Input, InputLeftAddon, InputRightAddon, InputRightElement, Box } from '@chakra-ui/react'

interface SearchInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
  onClear: () => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch, onClear }) => (
  <><InputGroup border="none" size="lg">
    <InputLeftAddon border="none" bgColor="#576270" color="white" fontWeight="700">
      URL
    </InputLeftAddon>
    <Input
      value={value}
      onChange={onChange}
      bgColor="black"
      border="none"
      color="white"
      fontWeight="400"
      _placeholder={{ fontWeight: '400', color: 'gray.600' }}
      placeholder="Example: https://github.com/nestjs/nest"
      _hover={{ borderColor: 'gray.500' }}
      focusBorderColor="transparent" />
    {value && (
      <InputRightElement marginRight='90px'>
      <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        width='20px' 
        height='20px' 
        borderRadius='50%' 
        bgColor="gray" 
        onClick={onClear}
        _hover={{ bgColor: 'white' }}
        cursor={'pointer'}
      >
        <span style={{ position: 'relative', top: '-2px', color: 'black'}}>x</span>
      </Box>
    </InputRightElement>
    )}
    <InputRightAddon
    onClick={onSearch}
    cursor="pointer"
    border="none"
    bgColor="#576270"
    color="white"
    fontWeight="700"
    _hover={{ bgColor: '#3f4d5b', color: 'gray.300' }}
  >
      Search
    </InputRightAddon>
  </InputGroup></>
)
