import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Button, Flex, Center, Text, Image} from 'native-base';
import Carousel from 'react-native-reanimated-carousel';
import {metric} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {LOGIN, REGISTER} from '@whenly/constants';

interface OnboardingProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

const Welcome = () => {
  const navigation = useNavigation();
  const onboarding = [
    {
      image: require('../../assets/images/onboarding_1.png'),
      title: 'Fitness adapted to your life',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiumod tempor',
    },
    {
      image: require('../../assets/images/onboarding_2.png'),
      title: 'More variety, more fun',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiumod tempor',
    },
    {
      image: require('../../assets/images/onboarding_3.png'),
      title: 'Feel fit & happy',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiumod tempor',
    },
  ];

  const renderSlider = ({item}: {item: OnboardingProps; index: number}) => {
    return (
      <Center flex={1} padding={4}>
        <Image
          source={item.image}
          size={metric.fullWidth}
          resizeMode="contain"
        />
        <Text fontSize={'4xl'} textAlign="center">
          {item.title}
        </Text>
        <Text textAlign={'center'} color="gray.500">
          {item.subtitle}
        </Text>
      </Center>
    );
  };

  return (
    <Flex safeArea bg={'white'} flex={1}>
      <Image
        alignSelf={'center'}
        source={require('../../assets/images/logomark_yellow.png')}
        size={'xs'}
        mt="8"
        resizeMode="contain"
      />
      <Flex flex={1}>
        <Carousel
          autoPlay={true}
          autoPlayInterval={3000}
          data={onboarding}
          renderItem={renderSlider}
          width={metric.fullWidth}
          // height={metric.fullHeight * 0.65}
        />
      </Flex>
      <Flex p={4}>
        <Button
          onPress={() => navigation.navigate(REGISTER)}
          borderRadius={metric.buttonRadius}>
          GET STARTED
        </Button>
        <Button
          onPress={() => navigation.navigate(LOGIN)}
          borderRadius={metric.buttonRadius}
          mt={4}
          variant="ghost">
          LOGIN
        </Button>
      </Flex>
    </Flex>
  );
};

export default Welcome;
