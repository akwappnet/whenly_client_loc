import {Box, Button, Center, Heading, Text, View} from 'native-base';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectProductState} from '@whenly/redux';
import {format} from 'date-fns';
import {convertToCurrency} from '@whenly/utils/numbers';

const PaymentSuccess = (props) => {
  const {navigation} = props;
  const {invoice} = useSelector(selectProductState);

  console.log('INVOICE', invoice);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Center flex={1}>
        <Heading>Payment Successful</Heading>
        <Center my={2}>
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
        </Center>
      </Center>
      <View py={16} mx="20px">
        <Button onPress={() => navigation.navigate('Details')}>Ok</Button>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;
