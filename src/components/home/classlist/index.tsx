import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  ScrollView,
  Spinner,
  Stagger,
} from 'native-base';
import {
  useAppDispatch,
  merchantActions,
  selectMerchantState,
  Merchant,
} from '@whenly/redux';
import ClassItem from './ClassItem';
import {useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const defaultThumbnail =
  'https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80';

const ClassList = () => {
  const appDispatch = useAppDispatch();
  const navigation = useNavigation();

  const {loading, docs} = useSelector(selectMerchantState);

  useEffect(() => {
    appDispatch(merchantActions.merchants());
  }, []);

  return (
    <Flex height="30%" justifyContent="space-between" flexDirection="column">
      <Box px="20px">
        <Heading size="xs">Find appointments, classes, and communities</Heading>
      </Box>
      {loading ? (
        <Center width="100%" height="100%" py="8px">
          <Spinner accessibilityLabel="Loading products" />
        </Center>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} py="8px">
          <HStack px={'20px'}>
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
              {docs.map((merchant: Merchant) => (
                <ClassItem
                  key={merchant._id}
                  title={merchant.companyName}
                  subTitle={merchant.address[0]?.address}
                  imageURL={{uri: merchant.profilePicture || defaultThumbnail}}
                  onPress={() => {
                    appDispatch(merchantActions.merchant(merchant._id)).then(
                      (response) => {
                        if (response.type === 'merchant/merchant/fulfilled') {
                          navigation.push('Details');
                        }
                      },
                    );
                  }}
                />
              ))}
            </Stagger>
          </HStack>
        </ScrollView>
      )}
    </Flex>
  );
};

export default ClassList;
