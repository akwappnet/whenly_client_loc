import React from 'react';
import {Dimensions, ImageSourcePropType} from 'react-native';
import {
  AspectRatio,
  Box,
  Center,
  Image,
  Pressable,
  Text,
  IconButton,
} from 'native-base';

import FA from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('screen');

interface MerchantCardProps {
  onPress: () => void;
  title: string;
  subTitle: string;
  imageURL: ImageSourcePropType | undefined;
  isFavorite: boolean;
  toggleFavorite: () => void | undefined;
}

const MerchantCard = ({
  onPress,
  title,
  subTitle,
  imageURL,
  isFavorite = false,
}: MerchantCardProps) => {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => (
        <Box m={4} opacity={isPressed ? 0.6 : 1}>
          <Box
            width="100%"
            borderRadius="2xl"
            height={150}
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

export default MerchantCard;
