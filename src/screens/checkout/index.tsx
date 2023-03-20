import {NativeStackScreenProps} from '@react-navigation/native-stack';
import HeaderBar from '@whenly/components/HeaderBar';
import Card from '@whenly/components/Card';
import {Box, Button, Flex, HStack, Progress, View} from 'native-base';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {
  productActions,
  selectClassState,
  selectCurrentUser,
  selectPlanState,
  selectProductState,
  useAppDispatch,
} from '@whenly/redux';
import {Text} from 'native-base';
import {add, format} from 'date-fns';
import {convertToCurrency} from '@whenly/utils/numbers';
import {CLASSES, PLAN} from '@whenly/constants';

const CheckoutScreen = (props) => {
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
  const startsAt = format(new Date(classData?.startsAt || ''), 'hh:mm a');
  const endsAt = format(new Date(classData?.endsAt || ''), 'hh:mm a');

  return (
    <SafeAreaView flex={1}>
      <HeaderBar onBack={() => props.navigation.goBack()} title="Checkout" />
      <Flex flex={1}>
        <Box my={8} mx="20px">
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
                <Text color="gray.400">{classData?.description}</Text>
              </Box>
              <Box my={2} alignItems="flex-end">
                <Text color="primary.600" fontWeight="bold">
                  {convertToCurrency(classData?.price || 0)}
                </Text>
              </Box>
            </Card>
          )}
        </Box>
      </Flex>
      <Flex py={16} mx="20px">
        {loading ? (
          <Progress />
        ) : (
          <Button
            borderRadius="lg"
            backgroundColor="primary.400"
            onPress={() => {
              if (route.params?.type === PLAN) {
                appDispatch(
                  productActions.getDragonpayToken({
                    Amount: `${plan?.price || 0}`,
                    Currency: 'PHP',
                    Description: `${plan?.name}`,
                    Email: user?.email || '',
                  }),
                ).then((response) => {
                  navigation.push('Payment', {
                    url: response.payload.Url,
                    type: PLAN,
                  });
                });
              } else {
                appDispatch(
                  productActions.getDragonpayToken({
                    Amount: `${classData?.price || 0}`,
                    Currency: 'PHP',
                    Description: `${classData?.name}`,
                    Email: user?.email || '',
                  }),
                ).then((response) => {
                  navigation.push('Payment', {
                    url: response.payload.Url,
                    type: CLASSES,
                  });
                });
              }
            }}>
            Next
          </Button>
        )}
      </Flex>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
