import React, {useState} from 'react';
import {
  classActions,
  ClassData,
  selectProductState,
  useAppDispatch,
} from '@whenly/redux';
import {CLASSES} from '@whenly/constants';
import {differenceInMinutes, format} from 'date-fns';
import {HStack, Box, Icon, Divider, Text, Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {convertToCurrency} from '@whenly/utils/numbers';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'native-base';

interface ClassItemProps {
  classData: ClassData;
}

export default function MerchantClassItem({classData}: ClassItemProps) {
  const appDispatch = useAppDispatch();
  const navigation = useNavigation();
  const {bookings} = useSelector(selectProductState);
  const [expanded, setExpanded] = useState(false);

  let classDuration = differenceInMinutes(
    new Date(classData.endsAt),
    new Date(classData.startsAt),
  );
  let durationUnit = 'min';

  if (classDuration >= 60) {
    classDuration = Math.floor(classDuration / 60);
    durationUnit = 'hr';
  }

  const bookedClass = bookings.find(
    (booking: any) => booking.id === classData._id,
  );

  const descriptionLines = expanded ? {} : {numberOfLines: 1};

  return (
    <HStack alignItems="center" space={2}>
      <Box flex={1}>
        <Box my={1}>
          <Text fontWeight="bold">{classData.name}</Text>
        </Box>
        <HStack my={1}>
          <Box backgroundColor="gray.200" px={2} py={1} borderRadius="2xl">
            <Text fontSize={11} color="gray.600">{`${format(
              new Date(classData.startsAt),
              'hh:mma',
            )}`}</Text>
          </Box>
          <Box
            backgroundColor="gray.200"
            px={2}
            py={1}
            ml={2}
            flexDirection="row"
            borderRadius="2xl">
            <Icon as={Feather} name="clock" color="gray.600" mr={2} />
            <Text
              fontSize={11}
              color="gray.500">{`${classDuration} ${durationUnit}`}</Text>
          </Box>
        </HStack>
        <Text color="gray.500">{classData.instructor}</Text>
        <Text color="gray.500" {...descriptionLines}>
          {classData.description}
        </Text>
        {classData.description.length > 40 && (
          <Pressable onPress={() => setExpanded(!expanded)} mt={1}>
            <Text color="primary.600">{`Read ${
              expanded ? 'Less' : 'More'
            }`}</Text>
          </Pressable>
        )}
      </Box>
      <Divider orientation="vertical" bg="gray.200" my={4} />
      <Box px={4}>
        <Text fontWeight="bold">{convertToCurrency(classData.price)}</Text>
        {!!bookedClass ? (
          <Button
            variant="solid"
            borderRadius="3xl"
            size="xs"
            height={8}
            backgroundColor="gray.200"
            justifyContent="center"
            disabled>
            {bookedClass.status === 'pending' ? 'Waitlist' : 'Booked'}
          </Button>
        ) : (
          <Button
            variant="solid"
            borderRadius="3xl"
            size="xs"
            height={8}
            backgroundColor="primary.400"
            justifyContent="center"
            onPress={() => {
              appDispatch(classActions.setClass(classData));
              navigation.navigate('Checkout', {type: CLASSES});
            }}>
            Book
          </Button>
        )}
      </Box>
    </HStack>
  );
}
