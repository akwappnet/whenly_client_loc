import React, {useMemo, useState} from 'react';
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
  FlatList,
  Heading,
  useTheme,
} from 'native-base';
import {Alert, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  classActions,
  planActions,
  productActions,
  selectClassState,
  selectCurrentUser,
  selectPlanState,
  selectProductState,
  useAppDispatch,
} from '@whenly/redux';
import {add, format} from 'date-fns';
import {convertToCurrency} from '@whenly/utils/numbers';
import {CLASSES, PAYMENT_OPTIONS, PLAN} from '@whenly/constants';
import {generateTransactionId} from '@whenly/utils/string';
import {
  StripeProvider,
  usePaymentSheet,
  useStripe,
} from '@stripe/stripe-react-native';
import {PUBLIC_KEY} from '@env';
import queryString from 'query-string';
let ephemeralKey;
let paymentIntentKey;
let customerID;
const CheckoutScreen = (props: any) => {
  const {presentPaymentSheet, initPaymentSheet, confirmPaymentSheetPayment} =
    useStripe();
  const {colors} = useTheme();
  const {navigation, route} = props;
  const {plan} = useSelector(selectPlanState);
  const {class: classData} = useSelector(selectClassState);
  const {loading} = useSelector(selectProductState);
  const user = useSelector(selectCurrentUser);
  const appDispatch = useAppDispatch();

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

  const [paymentMethod, setPaymentMethod] = useState('cc');
  const txnId = generateTransactionId();
  const isPlan = route.params?.type === PLAN;
  const subscription = route.params.subscription;

  console.log('subscription', subscription);

  // const createStripeCustomerApi = () => {
  // console.log('HIIIIIIIIII', user?.email, classData?.price);

  // const payload = {
  //   email: user?.email,
  //   secreate_stripe_key: SECRET_KEY,
  // };
  // console.log('@@@payload', payload);

  // appDispatch(productActions.createCustomerApi(payload)).then(
  //   async (response: any) => {
  //     createAPIEphemeralKey(response?.payload?.id);
  //     customerID = response?.payload?.id;
  //     console.log('@@@@customerID', customerID);
  //   },
  // );

  //   let actionToCall = null;
  //   const amount = (isPlan ? plan?.price : classData?.price) || 0;
  //   const description = (isPlan ? plan?.name : classData?.name) || '';
  //   let payload = {};
  //   if (paymentMethod === 'cc') {
  //     payload = {
  //       external_id: txnId,
  //       amount,
  //       description,
  //       user,
  //     };
  //     actionToCall = productActions.createXenditInvoice(payload);
  //   } else {
  //     payload = {
  //       Amount: amount,
  //       Currency: 'PHP',
  //       Description: description,
  //       Email: user?.email || '',
  //       txnId,
  //     };
  //     actionToCall = productActions.getDragonPayToken(payload);
  //   }
  //   appDispatch(actionToCall)
  //     .then(async (response: any) => {
  //       console.log('Response', response);
  //       let url = '';
  //       const payload = {
  //         txnId: txnId,
  //       };
  //       if (paymentMethod === 'cc') {
  //         url = response.payload.invoice_url;
  //         payload.referenceNo = response.payload.id;
  //       } else {
  //         url = response.payload.Url;
  //         if (paymentMethod === 'online-banking') {
  //           url = `${url}&mode=1`;
  //         } else if (paymentMethod !== 'online-banking') {
  //           url = `${url}&procid=${paymentMethod}`;
  //         }
  //       }
  //       let apiCall = null;
  //       if (isPlan) {
  //         apiCall = planActions.subscribeToPlan(payload);
  //         console.log('@@@@apicallPLANSUB', JSON.stringify(apiCall));
  //       } else {
  //         if (subscription) {
  //           payload.subscription = subscription;
  //         }
  //         console.log('@@@@@Book', payload);
  //         apiCall = classActions.book(payload);
  //         console.log('!!!!!!!!!!!!!!!!!!!!!!', JSON.stringify(apiCall));
  //       }
  //       const ad = await appDispatch(apiCall);
  //       console.log('apiCall', ad);
  //       // Create draft subscription or booking
  //       return {url, metadata: response};
  //     })
  //     .then(({url, metadata}) => {
  //       navigation.replace('Payment', {
  //         url,
  //         type: isPlan ? PLAN : CLASSES,
  //         txnId,
  //         subscription,
  //         paymentMethod,
  //         metadata,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log('Error', err);
  //       Alert.alert('err', err?.message);
  //     });
  // };

  // const createAPIEphemeralKey = (customerID = '') => {
  //   console.log('@@@@', customerID);
  //   var ObjectData = queryString.stringify({
  //     customer: customerID,
  //   });
  //   appDispatch(productActions.createEphemeralKey(ObjectData)).then(
  //     async (response: any) => {
  //       console.log('@@@@responseEPHERNAl', JSON.stringify(response));
  //       ephemeralKey = response?.payload?.secret;
  //       createAPIPaymentIntents(customerID);
  //     },
  //   );
  // };

  // const createAPIPaymentIntents = (customerID = '') => {
  //   console.log('@@@@', customerID);
  //   var ObjectData = queryString.stringify({
  //     customer: customerID,
  //     amount: Number(classData?.price) * 100,
  //     currency: 'USD',
  //     'automatic_payment_methods[enabled]': true,
  //   });
  //   appDispatch(productActions.createPaymentIntents(ObjectData)).then(
  //     async (response: any) => {
  //       paymentIntentKey = response?.payload?.client_secret;
  //       console.log('@@@@responseAPIIIIIII', JSON.stringify(response));
  //       if (response.error) {
  //         console.log('#######ERRROR');
  //         // callTransactionAPI();
  //       } else {
  //         initializePaymentSheet();
  //       }
  //     },
  //   );
  // };

  const createAPIPayment = () => {
    const objData = JSON.stringify({
      subId: isPlan ? plan?._id : classData?._id,
      userId: user.id,
      type: isPlan ? 'plan' : 'class',
      subscription: subscription ? subscription : null,
    });
    var ObjectData = {
      amount: isPlan
        ? Number(plan?.price) * 100
        : Number(classData?.price) * 100 || 0,
      currency: 'USD',
      description: objData,
    };
    appDispatch(productActions.createPayment(ObjectData)).then(
      async (response: any) => {
        if (response.error) {
          console.log('#######ERRROR', response.error);
        } else {
          customerID = response?.payload?.customer;
          ephemeralKey = response?.payload?.ephemeralKey;
          paymentIntentKey = response?.payload?.paymentIntent;
          initializePaymentSheet();
        }
      },
    );
  };

  const callHandlePayment = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
      console.log('EEEEEOE', error);
      return;
    } else {
      callTransaction();
    }
  };

  const callTransaction = () => {
    setTimeout(() => {
      isPlan
        ? navigation.replace('Success', {type: PLAN})
        : navigation.replace('Success', {type: CLASSES});
    }, 200);
  };

  const initializePaymentSheet = async () => {
    initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customerID,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntentKey,
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {
        name: 'Test',
      },
    })
      .then(async (response: any) => {
        callHandlePayment();
      })
      .catch((err) => {
        console.log('Error', err);
        Alert.alert('err', err?.message);
      });
  };

  const renderHeader = () => {
    return (
      <VStack my={4} space={8}>
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
          <Card>
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
                  subscription?.sessions > 0 ? 0 : classData?.price,
                )}
              </Text>
            </Box>
          </Card>
        )}
        {/* <Heading size="md">Payment Method</Heading> */}
      </VStack>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <VStack flex={1}>
        <HeaderBar onBack={() => props.navigation.goBack()} title="Checkout" />

        <FlatList
          flex={1}
          p={4}
          data={PAYMENT_OPTIONS}
          // renderItem={({item, index}) => {
          //   const isSelected = item.value === paymentMethod;
          //   return (
          //     <TouchableOpacity
          //       style={[
          //         styles.listItem,
          //         {
          //           borderColor: isSelected
          //             ? colors.primary['500']
          //             : colors.gray['300'],
          //         },
          //       ]}
          //       onPress={() => setPaymentMethod(item.value)}>
          //       <Text fontSize={'md'}>{item.label}</Text>
          //     </TouchableOpacity>
          //   );
          // }}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={() => {
            if (!isPlan) {
              return (
                <Text
                  fontSize={'xs'}
                  mt={8}
                  color="gray.500">{`Important Notice:\n
      For subscribers, cancellations made at least 24 hours prior to the scheduled appointment are free of charge. However, for drop-in classes, cancellations are not possible and the payment is non-refundable. No refunds will be given for missed classes or appointments. Please review our terms and FAQ carefully before making any bookings on our platform. Thank you for choosing Whenly for your fitness and wellness needs.`}</Text>
              );
            }
            return null;
          }}
        />
        <StripeProvider publishableKey={PUBLIC_KEY}></StripeProvider>
        {loading ? (
          <Progress />
        ) : (
          <>
            <Button
              borderRadius="lg"
              mx={4}
              isLoading={loading}
              isDisabled={!paymentMethod || loading}
              backgroundColor="primary.400"
              onPress={() => createAPIPayment()}>
              Next
            </Button>
          </>
        )}
      </VStack>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 5,
    marginVertical: 4,
    borderWidth: 1,
  },
});
