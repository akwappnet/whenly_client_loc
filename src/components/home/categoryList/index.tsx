import React from 'react';
import {
  Heading,
  HStack,
  Text,
  ScrollView,
  Flex,
  Pressable,
  Button,
} from 'native-base';
import CategoryThumbnail from './CategoryThumbnail';
import {CATEGORIES} from '../../../constants/strings';

const CategoryList = () => {
  const onToggle = (category: string) => {
    console.log('TEST', category);
  };

  return (
    <>
      <Flex px="20px" direction="row" justifyContent="space-between">
        <Heading size="xs">Explore Categories</Heading>
      </Flex>
      <HStack space={2} px="20px" py="8px" flexWrap={'wrap'}>
        {CATEGORIES.map((category) => {
          return (
            <Button
              size={'sm'}
              m={1}
              bg={'gray.400'}
              onPress={() => onToggle(category)}>
              {category}
            </Button>
          );
        })}
      </HStack>
    </>
  );
};

export default CategoryList;
