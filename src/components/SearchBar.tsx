import React from 'react';
import {Input, Icon, Box, Center} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';

interface SearchBarProps {
  onChangeText: (text: string) => void;
  placeholder?: string;
  value: string;
}

const SearchBar = ({onChangeText, placeholder, value}: SearchBarProps) => {
  return (
    <Center
      shadow={5}
      backgroundColor="white"
      w="100%"
      h="40px"
      borderRadius="2xl">
      <Input
        variant="unstyled"
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        InputLeftElement={
          <Icon
            as={<Octicons name="search" />}
            name="sesarch"
            size={5}
            ml="2"
            color="muted.400"
          />
        }
      />
    </Center>
  );
};

export default SearchBar;
