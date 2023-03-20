import React from 'react';
import {Dimensions, ImageSourcePropType} from 'react-native';
import {AspectRatio, Box, Center, Image, Pressable, Text} from 'native-base';

const {width} = Dimensions.get('screen');

interface ClassItemProps {
  onPress: () => void;
  title: string;
  subTitle: string;
  imageURL: ImageSourcePropType | undefined;
}

const ClassItem = ({onPress, title, subTitle, imageURL}: ClassItemProps) => {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => (
        <Box
          opacity={isPressed ? 0.6 : 1}
          width={{
            base: width * 0.72,
            lg: 250,
          }}
          mr={2}>
          <Box
            width="100%"
            borderRadius="2xl"
            height={130}
            backgroundColor="gray.300">
            <Image
              borderRadius="2xl"
              resizeMode="cover"
              source={imageURL}
              height={'100%'}
              width={'100%'}
              alt={title || 'Appointment'}
            />
          </Box>
          <Text fontWeight="bold">{title}</Text>
          <Text color="gray.500" fontSize="xs">
            {subTitle}
          </Text>
        </Box>
      )}
    </Pressable>
  );
};

export default ClassItem;
