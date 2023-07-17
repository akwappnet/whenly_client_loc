import React from 'react';
import {Input, Icon, Box, Center} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import {TextInputProps} from 'react-native';

interface SearchBarProps {
  onChangeText: (text: string) => void;
  placeholder?: string;
  value: string;
}

const SearchBar = ({
  onChangeText,
  placeholder,
  value,
  ...rest
}: TextInputProps) => {
  return (
    <Center
      shadow={5}
      backgroundColor="white"
      w="100%"
      h="40px"
      borderRadius="xl">
      <Input
        variant="unstyled"
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        {...rest}
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
