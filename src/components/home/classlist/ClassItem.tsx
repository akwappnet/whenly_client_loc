import React from 'react';
import {Dimensions, ImageSourcePropType} from 'react-native';
import {
  AspectRatio,
  Box,
  Center,
  Image,
  Pressable,
  Text,
  VStack,
  HStack,
} from 'native-base';

const {width} = Dimensions.get('screen');

interface ClassItemProps {
  onPress: () => void;
  title: string;
  subTitle: string;
  distance?: number;
  imageURL: ImageSourcePropType | undefined;
}

const ClassItem = ({
  onPress,
  title,
  subTitle,
  imageURL,
  distance,
}: ClassItemProps) => {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => (
        <Box
          opacity={isPressed ? 0.6 : 1}
          width={{
            base: width * 0.75,
            // lg: 250,
          }}>
          <Box
            width="100%"
            borderRadius="xl"
            height={130}
            backgroundColor="gray.300">
            <Image
              borderRadius="xl"
              resizeMode="cover"
              source={imageURL}
              height={'100%'}
              width={'100%'}
              alt={title || 'Appointment'}
            />
          </Box>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">{title}</Text>
            {distance && (
              <Text color="gray.500" fontSize="xs">
                {`~${distance} km`}
              </Text>
            )}
          </HStack>
          <Text color="gray.500" fontSize="xs">
            {subTitle}
          </Text>
        </Box>
      )}
    </Pressable>
  );
};

export default ClassItem;
