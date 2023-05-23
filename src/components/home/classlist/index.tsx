import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  ScrollView,
  Spinner,
  Stagger,
  Text,
  VStack,
} from 'native-base';
import {
  useAppDispatch,
  merchantActions,
  selectMerchantState,
  Merchant,
  selectCurrentUser,
} from '@whenly/redux';
import ClassItem from './ClassItem';
import {useSelector} from 'react-redux';
import React, {useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {metric} from '@whenly/theme/theme';
import {Modal} from 'react-native';

const defaultThumbnail =
  'https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80';

const ClassList = () => {
  const appDispatch = useAppDispatch();
  const navigation = useNavigation();

  const currentUser = useSelector(selectCurrentUser);
  const {loading, docs} = useSelector(selectMerchantState);
  console.log('@@@@curentUSer', currentUser);
  useFocusEffect(
    useCallback(() => {
      console.log('Fetch Nearby');
      let filters = {};
      if (currentUser?.address?.length > 0) {
        filters.coordinates = [
          currentUser?.address[0].long,
          currentUser?.address[0].lat,
        ];
        // filters.within = 20000; // in meter = 20km
      }
      appDispatch(merchantActions.merchants(filters));
    }, [appDispatch, currentUser?.address]),
  );

  return (
    <Flex justifyContent="space-between" flexDirection="column">
      <Box p="20px">
        <Heading size="xs">Find appointments, classes, and communities</Heading>
      </Box>
      {loading ? (
        <Center width="100%" height="100%" py="8px">
          <Spinner accessibilityLabel="Loading products" />
        </Center>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} py="8px">
          <Stagger
            visible={true}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                type: 'spring',
                stagger: {
                  offset: 100,
                },
              },
            }}
            exit={{
              opacity: 0,
            }}>
            <HStack space={8} px={'20px'}>
              {docs.length > 0 ? (
                docs.map((merchant: Merchant) => {
                  console.log('Merchant Details', merchant);
                  const roundedDistance =
                    Math.round((merchant.distance / 1000) * 100) / 100;
                  return (
                    <ClassItem
                      key={merchant._id}
                      title={merchant.companyName}
                      subTitle={merchant.address[0]?.address}
                      distance={roundedDistance || null}
                      imageURL={{
                        uri: merchant.profilePicture || defaultThumbnail,
                      }}
                      onPress={() => {
                        appDispatch(
                          merchantActions.merchant(merchant._id),
                        ).then((response) => {
                          if (response.type === 'merchant/merchant/fulfilled') {
                            navigation.push('Details', {
                              currentUserDetail:
                                currentUser && currentUser ? currentUser : null,
                            });
                          }
                        });
                      }}
                    />
                  );
                })
              ) : (
                <Center flex={1} width={metric.fullWidth - 40} h={'80px'}>
                  <Text color="gray.400">No nearby merchants</Text>
                </Center>
              )}
            </HStack>
          </Stagger>
        </ScrollView>
      )}
    </Flex>
  );
};

export default ClassList;
