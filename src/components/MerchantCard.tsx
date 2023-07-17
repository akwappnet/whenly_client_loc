import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Box, Image, Pressable, Text} from 'native-base';

interface MerchantCardProps {
  onPress: () => void;
  title: string;
  subTitle: string;
  imageURL: ImageSourcePropType | undefined;
  // isFavorite?: boolean;
  // toggleFavorite?: () => void | undefined;
}

const MerchantCard = ({
  onPress,
  title,
  subTitle,
  imageURL,
}: MerchantCardProps) => {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => (
        <Box opacity={isPressed ? 0.6 : 1}>
          <Box borderRadius="2xl" height={150} backgroundColor="gray.300">
            <Image
              borderRadius="xl"
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
