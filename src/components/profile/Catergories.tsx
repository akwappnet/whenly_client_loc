import React from 'react';
import {
  Heading,
  Input,
  VStack,
  FormControl,
  TextArea,
  HStack,
  Button,
  Text,
} from 'native-base';
import Card from '@whenly/components/Card';
import {FormikProps} from 'formik';
import {ProfileFormValues} from '@whenly/screens/profile/EditProfile';
import {CATEGORIES} from '@whenly/constants';
import {clone} from 'ramda';

const Categories = ({
  data,
  onSelect,
}: {
  data: string[];
  onSelect: (categories: string[]) => void;
}) => {
  const onToggle = (category: string) => {
    let updatedCategories = clone(data);
    if (updatedCategories.includes(category)) {
      const idx = updatedCategories.findIndex((v) => v === category);
      updatedCategories.splice(idx, 1);
    } else {
      updatedCategories.push(category);
    }
    onSelect(updatedCategories);
  };

  return (
    <Card>
      <VStack>
        <Text fontSize="sm" color="gray.500">
          Please select at least one
        </Text>
        <HStack space={1} mt={2} flexWrap={'wrap'}>
          {CATEGORIES.map((category) => {
            const isSelected = data.includes(category);
            return (
              <Button
                size={'sm'}
                m={1}
                bg={isSelected ? 'primary.500' : 'gray.400'}
                onPress={() => onToggle(category)}>
                {category}
              </Button>
            );
          })}
        </HStack>
      </VStack>
    </Card>
  );
};

export default Categories;
