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
  VStack,
} from 'native-base';
import CategoryThumbnail from './CategoryThumbnail';
import {CATEGORIES, COLOR_PALETTE} from '../../../constants/strings';
import {metric} from '@whenly/theme/theme';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const categoryList = [
  // {
  //   label: 'Wall Climbing',
  //   value: 'Wall Climbing',
  //   image: require('../../../assets/images/categories/wall-climbing.jpg'),
  // },
  // {
  //   label: 'Boxing',
  //   value: 'Boxing',
  //   image: require('../../../assets/images/categories/boxing.jpg'),
  // },
  // {
  //   label: 'Crossfit',
  //   value: 'Crossfit',
  //   image: require('../../../assets/images/categories/crossfit.jpg'),
  // },
  // {
  //   label: 'Cycling',
  //   value: 'Cycling',
  //   image: require('../../../assets/images/categories/cycling.jpg'),
  // },
  // {
  //   label: 'Dance Class',
  //   value: 'Dance Studio',
  //   image: require('../../../assets/images/categories/dance.jpg'),
  // },
  // {
  //   label: 'Gym',
  //   value: 'Gym',
  //   image: require('../../../assets/images/categories/gym.jpg'),
  // },
  // {
  //   label: 'HIIT',
  //   value: 'HIIT',
  //   image: require('../../../assets/images/categories/hiit.jpg'),
  // },
  // {
  //   label: 'BJJ/MMA',
  //   value: 'BJJ/MMA',
  //   image: require('../../../assets/images/categories/bjj.jpg'),
  // },
  // {
  //   label: 'Pilates',
  //   value: 'Pilates',
  //   image: require('../../../assets/images/categories/pilates.jpg'),
  // },
  {
    label: 'Mental Wellness',
    value: 'Mental Wellness',
    image: '',
  },
  {
    label: 'Stress Relief',
    value: 'Stress Relief',
    image: '',
  },
  {
    label: 'Healthy Eating',
    value: 'Healthy Eating',
    image: '',
  },
  {
    label: 'Career Growth',
    value: 'Career Growth',
    image: '',
  },
  {
    label: 'Financial Freedom',
    value: 'Financial Freedom',
    image: '',
  },
  {
    label: 'Personal Accountability',
    value: 'Personal Accountability',
    image: '',
  },
];

const size = metric.fullWidth / 3 - 24;

const CategoryList = () => {
  const navigation = useNavigation();
  const onPress = (category: string) => {
    navigation.navigate('SearchResults', {category: category.value});
  };

  return (
    <>
      <Flex px="20px" direction="row" justifyContent="space-between">
        <Heading size="sm">What do you need help with?</Heading>
      </Flex>
      <VStack px="20px" py="8px" space={2}>
        {categoryList.map((category) => {
          const bgColor =
            COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
          return (
            <TouchableOpacity
              onPress={() => onPress(category)}
              style={[styles.container, {backgroundColor: bgColor}]}>
              {/* <Image
                source={category.image}
                style={{height: size, width: size}}
              /> */}
              <Text style={styles.label}>{category.value}</Text>
              <Icon name="arrow-right" size={24} color={'#FFF'} />
            </TouchableOpacity>
          );
        })}
      </VStack>
    </>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 2,
    flexDirection: 'row',
  },
  label: {
    // position: 'absolute',
    flex: 1,
    fontSize: 16,
    color: 'white',
    // textAlign: 'left',
    fontWeight: 'bold',
  },
});
