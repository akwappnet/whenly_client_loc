import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Heading,
  HStack,
  Text,
  ScrollView,
  Flex,
  Pressable,
  Button,
  Image,
} from 'native-base';
import CategoryThumbnail from './CategoryThumbnail';
import {CATEGORIES} from '../../../constants/strings';
import {metric} from '@whenly/theme/theme';
import {useNavigation} from '@react-navigation/native';

const categoryList = [
  {
    label: 'Wall Climbing',
    value: 'Wall Climbing',
    image: require('../../../assets/images/categories/wall-climbing.jpg'),
  },
  {
    label: 'Boxing',
    value: 'Boxing',
    image: require('../../../assets/images/categories/boxing.jpg'),
  },
  {
    label: 'Crossfit',
    value: 'Crossfit',
    image: require('../../../assets/images/categories/crossfit.jpg'),
  },
  {
    label: 'Cycling',
    value: 'Cycling',
    image: require('../../../assets/images/categories/cycling.jpg'),
  },
  {
    label: 'Dance Class',
    value: 'Dance Studio',
    image: require('../../../assets/images/categories/dance.jpg'),
  },
  {
    label: 'Gym',
    value: 'Gym',
    image: require('../../../assets/images/categories/gym.jpg'),
  },
  {
    label: 'HIIT',
    value: 'HIIT',
    image: require('../../../assets/images/categories/hiit.jpg'),
  },
  {
    label: 'BJJ/MMA',
    value: 'BJJ/MMA',
    image: require('../../../assets/images/categories/bjj.jpg'),
  },
  {
    label: 'Pilates',
    value: 'Pilates',
    image: require('../../../assets/images/categories/pilates.jpg'),
  },
];

const size = metric.fullWidth / 3 - 24;

const CategoryList = () => {
  const navigation = useNavigation();
  const onPress = (category: string) => {
    console.log('TEST', category);
    navigation.navigate('SearchResults', {category: category.value});
  };

  return (
    <>
      <Flex px="20px" direction="row" justifyContent="space-between">
        <Heading size="xs">Explore Categories</Heading>
      </Flex>
      <HStack px="20px" py="8px" flexWrap={'wrap'}>
        {categoryList.map((category) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(category)}
              style={styles.container}>
              <Image
                source={category.image}
                style={{height: size, width: size}}
              />
              <Text style={styles.label}>{category.value}</Text>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});
