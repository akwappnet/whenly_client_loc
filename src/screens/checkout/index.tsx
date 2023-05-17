import React from 'react';
import HeaderBar from '@whenly/components/HeaderBar';
import Card from '@whenly/components/Card';
import {
  Box,
  Button,
  Flex,
  Progress,
  VStack,
  Text,
  ScrollView,
} from 'native-base';
import {Alert, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {
  productActions,
  selectClassState,
  selectCurrentUser,
  selectPlanState,
  selectProductState,
  useAppDispatch,
} from '@whenly/redux';
import {add, format} from 'date-fns';
import {convertToCurrency} from '@whenly/utils/numbers';
import {CLASSES, PLAN} from '@whenly/constants';
import {generateTransactionId} from '@whenly/utils/string';

const CheckoutScreen = (props) => {
  const {navigation, route} = props;
  const {plan} = useSelector(selectPlanState);
  const {class: classData} = useSelector(selectClassState);
  const {loading} = useSelector(selectProductState);
  const user = useSelector(selectCurrentUser);
  const appDispatch = useAppDispatch();
  console.log('class data', classData);
  console.log('pan data', plan);
  const startDate = format(new Date(), 'MMM d, yyyy');
  const endDate = format(
    new Date(
      add(new Date(), {
        [plan?.interval ? `${plan.interval}s` : 'months']: plan?.duration,
      }),
    ),
    'MMM d, yyyy',
  );
  const startsAt = format(
    classData?.startsAt ? new Date(classData?.startsAt) : new Date(),
    'hh:mm a',
  );
  const endsAt = format(
    classData?.endsAt ? new Date(classData?.endsAt) : new Date(),
    'hh:mm a',
  );

  const txnId = generateTransactionId();
  console.log('Transaction ID', txnId);
  const isPlan = route.params?.type === PLAN;
  const subscription = route.params.subscription;
  console.log('Subscription', subscription);
  const onPress = () => {
    if (isPlan) {
      appDispatch(
        productActions.getDragonPayToken({
          Amount: `${plan?.price || 0}`,
          Currency: 'PHP',
          Description: `${plan?.name}`,
          Email: user?.email || '',
          txnId,
        }),
      )
        .then((response) => {
          console.log('Response', response);
          navigation.replace('Payment', {
            url: response.payload.Url,
            type: PLAN,
            txnId,
            subscription,
          });
        })
        .catch((err) => {
          console.log('Error', err);
          Alert.alert('err', err?.message);
        });
    } else {
      appDispatch(
        productActions.getDragonPayToken({
          Amount: `${classData?.price || 0}`,
          Currency: 'PHP',
          Description: `${classData?.name}`,
          Email: user?.email || '',
          txnId,
        }),
      )
        .then((response) => {
          console.log('Response', response);
          navigation.replace('Payment', {
            url: response.payload.Url,
            type: CLASSES,
            txnId,
            subscription,
          });
        })
        .catch((err) => {
          console.log('Error', err);
          Alert.alert('err', err?.message);
        });
    }
  };

  return (
    <SafeAreaView flex={1}>
      <VStack>
        <HeaderBar onBack={() => props.navigation.goBack()} title="Checkout" />

        <VStack my={8} mx="20px" space={8}>
          {route.params?.type === PLAN ? (
            <Card>
              <Box my={2}>
                <Text fontWeight="bold">{plan?.name}</Text>
                <Text color="gray.400">
                  {`${plan?.duration} ${plan?.interval}`}
                </Text>
                <Text color="gray.400">{`Start: ${startDate}`}</Text>
                <Text color="gray.400">{`Expires: ${endDate}`}</Text>
              </Box>
              <Box my={2} alignItems="flex-end">
                <Text color="primary.600" fontWeight="bold">
                  {convertToCurrency(plan?.price || 0)}
                </Text>
              </Box>
            </Card>
          ) : (
            <Card h="50%">
              <Box my={2}>
                <Text fontWeight="bold">{classData?.name}</Text>
                <Text color="gray.400">{`${startsAt} - ${endsAt}`}</Text>
                <Text color="gray.400">{classData?.instructor}</Text>
              </Box>
              <ScrollView>
                <Text color="gray.400">{classData?.description}</Text>
              </ScrollView>
              <Box my={2} alignItems="flex-end">
                <Text color="primary.600" fontWeight="bold">
                  {convertToCurrency(
                    classData?.price && subscription?.sessions === 0
                      ? classData?.price
                      : 0,
                  )}
                </Text>
              </Box>
            </Card>
          )}
          {!isPlan && (
            <Text fontSize={'xs'} color="gray.500">{`Important Notice:\n
  For subscribers, cancellations made at least 24 hours prior to the scheduled appointment are free of charge. However, for drop-in classes, cancellations are not possible and the payment is non-refundable. No refunds will be given for missed classes or appointments. Please review our terms and FAQ carefully before making any bookings on our platform. Thank you for choosing Whenly for your fitness and wellness needs.`}</Text>
          )}
        </VStack>
        {/* <Flex py={16} mx="20px"> */}
        {loading ? (
          <Progress />
        ) : (
          <Button
            borderRadius="lg"
            mx={4}
            backgroundColor="primary.400"
            onPress={onPress}>
            Next
          </Button>
        )}
        {/* </Flex> */}
      </VStack>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
