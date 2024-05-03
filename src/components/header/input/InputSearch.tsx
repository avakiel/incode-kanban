import { InputGroup, Input, InputLeftAddon, InputRightAddon } from '@chakra-ui/react'

interface SearchInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch }) => (
  <InputGroup border="none" size="lg">
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
      focusBorderColor="transparent"
    />
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
  </InputGroup>
)
