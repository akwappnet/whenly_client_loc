import React from 'react';
import {Box, Button, Center, Heading, Text, View} from 'native-base';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectProductState} from '@whenly/redux';
import {format} from 'date-fns';
import {convertToCurrency} from '@whenly/utils/numbers';

const PaymentSuccess = (props) => {
  const {navigation, route} = props;
  console.log('routes', navigation);
  const {type} = route.params;
  const {invoice} = useSelector(selectProductState);

  console.log('INVOICE', invoice);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Center flex={1} px={4}>
        <Heading>
          {type === 'classes'
            ? 'Great job booking your class!'
            : 'Congratulations on your purchase!'}
        </Heading>
        <Text mt={8} marginX={4}>
          {type === 'classes'
            ? `You're one step closer to achieving your fitness and wellness goals.

To see your upcoming class and manage your schedule, simply head over to the "Schedule" section in your profile.`
            : "You've just unlocked a world of fitness and wellness opportunities. Now it's time to put that package to good use and start your journey towards a healthier you. Get started by booking your first session right away!"}
        </Text>
        {/* <Center my={2}>
          <Text mb={4}>
            {invoice?.invoiceDate
              ? format(new Date(invoice?.invoiceDate || ''), 'MMM d, yyyy')
              : ''}
          </Text>
          {invoice?.lineItems.map((item) => (
            <>
              <Text fontWeight="bold">
                {convertToCurrency(item.lineAmount)}
              </Text>
              <Text>Amount</Text>
            </>
          ))}
        </Center> */}
      </Center>
      <View py={16} mx="20px">
        <Button
          onPress={() => {
            if (type === 'classes') {
              console.log('@@@@class');
              navigation.replace('Schedule');
            } else {
              console.log('@@@@Details');
              navigation.navigate('Details', {from: 'success', type});
            }
          }}>
          {type === 'classes' ? 'View My Schedule' : 'Book a class'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;
