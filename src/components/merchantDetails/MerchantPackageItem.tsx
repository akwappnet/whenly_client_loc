import {useNavigation} from '@react-navigation/native';
import {
  Plan,
  planActions,
  selectProductState,
  Subscription,
  useAppDispatch,
} from '@whenly/redux';
import {PLAN} from '@whenly/constants';
import {Box, Button, HStack, Text, Divider, Center} from 'native-base';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {convertToCurrency} from '@whenly/utils/numbers';
import {Pressable} from 'native-base';

interface PackageItemProps {
  planData: Plan;
}

export default function MerchantPackageItem({planData}: PackageItemProps) {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const {subscriptions} = useSelector(selectProductState);
  const [expanded, setExpanded] = useState(false);

  const subscribed = subscriptions.some(
    (sub: Subscription) => sub.planId === planData._id,
  );

  const descriptionLines = expanded ? {} : {numberOfLines: 1};

  return (
    <HStack alignItems="center" space={2} py={2}>
      <Box flex={1}>
        <Box my={1}>
          <Text fontWeight="bold">{planData.name}</Text>
        </Box>
        <HStack my={1} space={1}>
          {planData.tags.split(',').map((tag: string) => (
            <Box backgroundColor="gray.200" px={2} py={1} borderRadius="2xl">
              <Text fontSize={11} color="gray.600">
                {tag}
              </Text>
            </Box>
          ))}
        </HStack>
        <Text color="gray.500">{`Duration: ${planData.duration} ${planData.interval}/s`}</Text>
        <Text color="gray.500" {...descriptionLines}>
          {planData.description}
        </Text>
        {planData.description.length > 40 && (
          <Pressable onPress={() => setExpanded(!expanded)} mt={1}>
            <Text color="primary.600">{`Read ${
              expanded ? 'Less' : 'More'
            }`}</Text>
          </Pressable>
        )}
      </Box>
      <Divider orientation="vertical" bg="gray.200" my={4} />
      <Center px={3}>
        <Text fontWeight="bold">{convertToCurrency(planData.price)}</Text>

        {subscribed ? (
          <Button
            variant="solid"
            borderRadius="3xl"
            size="xs"
            height={8}
            disabled
            backgroundColor="gray.400">
            Subscribed
          </Button>
        ) : (
          <Button
            variant="solid"
            borderRadius="3xl"
            size="xs"
            height={8}
            onPress={() => {
              appDispatch(planActions.setPlan(planData));
              navigation.navigate('Checkout', {type: PLAN});
            }}>
            Subscribe
          </Button>
        )}
        {planData.slots > 0 && (
          <Text fontSize={11} color="gray.400">
            {`Slots: ${planData.slots}`}
          </Text>
        )}
      </Center>
    </HStack>
  );
}
