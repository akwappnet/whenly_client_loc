import React, {useState} from 'react';
import {
  classActions,
  ClassData,
  selectProductState,
  useAppDispatch,
} from '@whenly/redux';
import {CLASSES} from '@whenly/constants';
import {HStack, Box, Icon, Divider, Text, Button, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {convertToCurrency} from '@whenly/utils/numbers';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'native-base';
import moment from 'moment';
import {SubscriptionTag} from '@whenly/utils/subscriptionTag';

interface ClassItemProps {
  classData: ClassData;
  showMerchant?: boolean;
}

const MerchantClassItem = ({classData, showMerchant}: ClassItemProps) => {
  const appDispatch = useAppDispatch();
  const navigation = useNavigation();
  const {bookings} = useSelector(selectProductState);
  const [expanded, setExpanded] = useState(false);

  const bookedClass = bookings.find(
    (booking: any) => booking.classId === classData.id,
  );
  const descriptionLines = expanded ? {} : {numberOfLines: 1};

  const start = moment.utc(classData.startsAt);
  const end = moment.utc(classData.endsAt);

  const duration = moment.duration(start.diff(end));
  const subscription = SubscriptionTag(classData.tags.toLowerCase());
  const viaSubscription = subscription?.sessions > 0;
  console.log('@@@@viaSub', viaSubscription);
  return (
    <HStack alignItems="center" space={2} py={2}>
      <Box flex={3}>
        <Box my={1}>
          <Text fontWeight="bold">{classData.name}</Text>
          {showMerchant && (
            <Text>{`by ${classData?.merchant?.companyName}`}</Text>
          )}
        </Box>
        <HStack my={1}>
          <Box backgroundColor="gray.200" px={2} py={1} borderRadius="2xl">
            <Text fontSize={11} color="gray.600">{`${start.format(
              'hh:mm a',
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
              color="gray.500">{`${duration.humanize()}`}</Text>
          </Box>
        </HStack>
        <Text color="gray.500">{classData.instructor}</Text>
        <Text color="gray.500" {...descriptionLines}>
          {classData.description}
        </Text>
        <Text fontSize={11} color="gray.400">
          {`${
            classData && classData?.serviceType ? classData?.serviceType : ''
          }`}
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
      <Center flex={1} px={2}>
        <Text fontWeight="bold">
          {viaSubscription ? 'Free' : convertToCurrency(classData.price)}
        </Text>
        {!!bookedClass ? (
          <Button
            variant="solid"
            borderRadius="2xl"
            size="xs"
            height={8}
            minW={'80px'}
            backgroundColor="gray.400"
            justifyContent="center"
            disabled>
            {bookedClass.status === 'pending' ? 'Booked' : 'Booked'}
          </Button>
        ) : (
          <Button
            variant="solid"
            borderRadius="2xl"
            size="xs"
            height={8}
            minW={'80px'}
            backgroundColor="primary.400"
            justifyContent="center"
            onPress={() => {
              appDispatch(classActions.setClass(classData));
              navigation.replace('Checkout', {
                type: CLASSES,
                subscription,
              });
            }}>
            {viaSubscription ? 'Book' : 'Drop-in'}
          </Button>
        )}
      </Center>
    </HStack>
  );
};

export default MerchantClassItem;
