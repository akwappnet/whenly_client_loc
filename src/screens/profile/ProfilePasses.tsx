import React, {useState, useEffect} from 'react';
import Card from '@whenly/components/Card';
import {Box, Button, Divider, FlatList, Icon, Text, VStack} from 'native-base';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import Entypo from 'react-native-vector-icons/Entypo';
import {convertToCurrency} from '@whenly/utils/numbers';
import ProfileContainer from '@whenly/components/profile/ProfileContainer';
import {
  useAppDispatch,
  productActions,
  selectSubscriptions,
  planActions,
} from '@whenly/redux';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Alert} from 'react-native';
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
const ProfilePasses = (props: any) => {
  const appDispatch = useAppDispatch();
  const subscriptions = useSelector(selectSubscriptions);
  const [expandedSched, setExpandedSched] = useState<string | null>(null);

  const toggleExpandedSched = (id: string) => {
    setExpandedSched(expandedSched === id ? null : id);
  };

  useEffect(() => {
    appDispatch(productActions.subscriptions());
  }, [appDispatch]);

  const onCancel = (planId: string) => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel this subscription?',
      [
        {text: 'Cancel', onPress: () => {}},
        {
          text: 'Yes',
          onPress: () => {
            appDispatch(planActions.cancelPlan(planId))
              .then((response) => {
                console.log('Response', response);
                appDispatch(productActions.subscriptions());
                successToast(
                  'Subscription Cancelled',
                  'Subscription cancelled successfully',
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

  function renderScheduleItem({item}: any) {
    const isOpen = expandedSched === item.id;
    const {name, description, createdAt, duration} = item.productDetails;
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
            <Text
              px={2}
              // flex={2}
              fontWeight={'bold'}
              color={'red.500'}
              numberOfLines={2}
              fontSize={12}>
              {`Sessions: ${
                item.sessions === -1 ? 'Unlimited' : item.sessions
              }`}
            </Text>
            <Text px={2} flex={2} numberOfLines={2} fontSize={12}>
              {`Order Date: ${moment.utc(createdAt).format('LL')}`}
            </Text>
          </VStack>
          <Box flex={1}>
            <Button
              isDisabled={item.status !== 'active'}
              borderColor={item.status === 'active' ? 'primary.500' : 'red.500'}
              _text={{
                color: item.status === 'active' ? 'primary.500' : 'red.500',
              }}
              onPress={() => onCancel(item.id)}
              size="xs"
              variant={'outline'}
              justifyContent="center"
              padding={0}
              height={8}
              borderRadius={100}>
              {item.status === 'active' ? 'Cancel' : 'Cancelled'}
            </Button>
          </Box>

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
                {duration}
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
                {convertToCurrency(item?.pricingDetails?.price || 0)}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <ProfileContainer
      title="My Passes"
      subtitle="These are the passes you purchased.">
      <Card h="80%">
        <FlatList
          data={subscriptions}
          renderItem={renderScheduleItem}
          ListEmptyComponent={
            <EmptyListMessage message="You have not purchased any passes yet." />
          }
          ItemSeparatorComponent={() => <Divider />}
        />
      </Card>
    </ProfileContainer>
  );
};

export default ProfilePasses;
