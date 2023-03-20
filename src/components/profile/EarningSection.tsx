import React from 'react';
import {Box, Button, HStack, Heading} from 'native-base';
import {convertToCurrency} from '@whenly/utils/numbers';
import Card from '@whenly/components/Card';
import {useNavigation} from '@react-navigation/native';

const EarningSection = () => {
  const navigation = useNavigation();
  return (
    <Box px={'20px'}>
      <Card>
        <HStack justifyContent={'space-between'} alignItems={'center'} py={4}>
          <Heading fontWeight={'bold'}>{convertToCurrency(0)}</Heading>
          <Button
            onPress={() => navigation.navigate('BillingDetails')}
            size={'xs'}>
            Billing Details
          </Button>
        </HStack>
      </Card>
    </Box>
  );
};

export default EarningSection;
