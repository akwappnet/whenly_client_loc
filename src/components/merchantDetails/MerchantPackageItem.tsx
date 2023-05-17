import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Plan,
  planActions,
  selectProductState,
  Subscription,
  useAppDispatch,
} from '@whenly/redux';
import {PLAN} from '@whenly/constants';
import {
  Box,
  Button,
  HStack,
  Text,
  Divider,
  Center,
  Pressable,
} from 'native-base';
import {useSelector} from 'react-redux';
import {convertToCurrency} from '@whenly/utils/numbers';

interface PackageItemProps {
  planData: Plan;
  showMerchant?: boolean;
}

export default function MerchantPackageItem({
  planData,
  showMerchant,
}: PackageItemProps) {
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
      <Box flex={3}>
        <Box my={1}>
          <Text fontWeight="bold">{planData.name}</Text>
          {showMerchant && (
            <Text>{`by ${planData?.merchant?.companyName}`}</Text>
          )}
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
      <Center flex={1} px={2}>
        <Text fontWeight="bold">{convertToCurrency(planData.price)}</Text>
        {subscribed ? (
          <Button
            variant="solid"
            borderRadius="2xl"
            size="xs"
            height={8}
            disabled
            minW={'80px'}
            backgroundColor="gray.400">
            Subscribed
          </Button>
        ) : (
          <Button
            variant="solid"
            borderRadius="2xl"
            size="xs"
            height={8}
            minW={'80px'}
            onPress={() => {
              appDispatch(planActions.setPlan(planData));
              navigation.navigate('Checkout', {type: PLAN});
            }}>
            Subscribe
          </Button>
        )}

        <Text fontSize={11} color="gray.400">
          {`Sessions: ${planData.slots > 0 ? planData.slots : 'Unlimited'}`}
        </Text>
      </Center>
    </HStack>
  );
}
