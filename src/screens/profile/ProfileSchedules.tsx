import HeaderBar from '@whenly/components/HeaderBar';
import Card from '@whenly/components/Card';
import {
  Box,
  Button,
  Divider,
  FlatList,
  Icon,
  Stagger,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import Entypo from 'react-native-vector-icons/Entypo';
import {convertToCurrency} from '@whenly/utils/numbers';
import ProfileContainer from '@whenly/components/profile/ProfileContainer';
import {
  useAppDispatch,
  authActions,
  productActions,
  selectCurrentUser,
  selectBookings,
  classActions,
} from '@whenly/redux';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {errorToast, successToast} from '@whenly/utils/useToast';

const dummySchedules = [
  {
    id: '1',
    name: 'Unlimited Gym Use Anytime Fitness',
    orderDate: 'Jan 1, 2022',
    duration: '1 Month',
    startDate: 'October 1, 2023',
    endDate: 'November 1, 2023',
    totalAmount: 200000,
  },
  {
    id: '2',
    name: 'Oct 19, 2022 5:00 pm Taekwondo IronForge Fitness',
    orderDate: 'Jan 1, 2022',
    duration: '1 Month',
    startDate: 'October 1, 2023',
    endDate: 'November 1, 2023',
    totalAmount: 200000,
  },
];
const ProfileSchedules = (props: any) => {
  const appDispatch = useAppDispatch();
  const schedules = useSelector(selectBookings);

  const [expandedSched, setExpandedSched] = useState<string | null>(null);

  const toggleExpandedSched = (id: string) => {
    setExpandedSched(expandedSched === id ? null : id);
  };

  useEffect(() => {
    appDispatch(productActions.bookings());
  }, [appDispatch]);

  console.log('schedules', schedules);

  const onCancel = (classId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {text: 'Cancel', onPress: () => {}},
        {
          text: 'Yes',
          onPress: () => {
            appDispatch(classActions.cancelBooking(classId))
              .then((response) => {
                console.log('Response', response);
                appDispatch(productActions.bookings());
                successToast(
                  'Booking Cancelled',
                  'Booking cancelled successfully',
                );
              })
              .catch((error) => {
                console.log('Error', error);
                errorToast(
                  'Error',
                  'Something went wrong. Please try again later',
                );
              });
          },
        },
      ],
    );
  };

  const renderScheduleItem = ({item}: any) => {
    const isOpen = expandedSched === item.id;
    const {name, createdAt, startsAt} = item.productDetails;
    console.log(item)
    return (
      <Box py={6}>
        <Box flexDirection={'row'}>
          <VStack flex={2}>
            <Text
              px={2}
              // flex={2}
              fontWeight={'bold'}
              numberOfLines={2}
              fontSize={12}>
              {`${moment.utc(item.classDetails.startsAt).format('LLL')}`}
            </Text>
            <Text
              px={2}
              // flex={2}
              fontWeight={'bold'}
              numberOfLines={2}
              fontSize={12}>
              {name}
            </Text>
            <Text
              px={2}
              // flex={2}
              fontWeight={'bold'}
              numberOfLines={2}
              fontSize={12}>
              {item.merchant.companyName}
            </Text>
            
            <Text px={2} flex={2} numberOfLines={2} fontSize={12}>
              {`Order Date: ${moment.utc(createdAt).format('LL')}`}
            </Text>
          </VStack>
          {item.status === 'pending' && (
            <Box flex={1}>
              <Button
                onPress={() => onCancel(item.id)}
                size="xs"
                variant={'outline'}
                justifyContent="center"
                padding={0}
                height={8}
                borderRadius={100}>
                Cancel
              </Button>
            </Box>
          )}
          <Box flexDirection="row">
            <Button
              variant="ghost"
              height={8}
              size="xs"
              rightIcon={<Icon as={Entypo} name="chevron-small-down" />}
              fontSize={10}
              color="gray.500"
              onPress={() => toggleExpandedSched(item.id)}>
              Details
            </Button>
          </Box>
        </Box>
        {isOpen && (
          <Box width={'70%'} py={4}>
            <Divider />
            <Box my={4}>
              <Text color="gray.500" fontWeight={'bold'}>
                {item.duration}
              </Text>
              <Text color="gray.500">
                {`Start: ${moment.utc(item.startsAt).format('LL')}`}
              </Text>
              <Text color="gray.500">
                {`End: ${moment.utc(item.endsAt).format('LL')}`}
              </Text>
            </Box>
            <Divider />
            <Box my={4} flexDirection="row" justifyContent={'space-between'}>
              <Text color="gray.300" fontStyle={'italic'}>
                Total Amount
              </Text>
              <Text color="gray.500" fontWeight={'bold'}>
                {convertToCurrency(
                  item.viaSubscription ? 0 : item?.pricingDetails?.price || 0,
                )}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <ProfileContainer
      title="My Schedule"
      subtitle="These are the classes or appointments you booked.">
      <Card>
        <FlatList
          data={schedules}
          renderItem={renderScheduleItem}
          ListEmptyComponent={
            <EmptyListMessage message="You have not booked any classes or appointments yet." />
          }
          ItemSeparatorComponent={() => <Divider />}
        />
      </Card>
    </ProfileContainer>
  );
};

export default ProfileSchedules;
