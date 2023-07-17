import {
  Box,
  Center,
  FlatList,
  Flex,
  Heading,
  HStack,
  ScrollView,
  Spinner,
  Stagger,
  VStack,
  Text,
} from 'native-base';
import {
  useAppDispatch,
  merchantActions,
  selectMerchantState,
  Merchant,
} from '@whenly/redux';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MerchantCard from '@whenly/components/MerchantCard';
import HeaderBar from '@whenly/components/HeaderBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchBar from '@whenly/components/SearchBar';
import {useDebounce} from 'use-debounce';

const defaultThumbnail =
  'https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80';

const SearchResults = () => {
  const appDispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [keyword, setKeyword] = useState('');
  const [search] = useDebounce(keyword, 1000);
  const [category, setCategory] = useState(routes?.params?.category || null);

  const {loading, docs} = useSelector(selectMerchantState);
  console.log('Routes', category, routes);
  console.log('Merchants', docs);

  useEffect(() => {
    let filters = {
      keyword: search,
    };
    if (category) {
      filters.category = category;
    }
    if (keyword || category) {
      appDispatch(merchantActions.merchants(filters));
    }
  }, [appDispatch, category, search]);

  useEffect(() => {
    // Reset Category
    setCategory(null);
  }, [search]);

  return (
    <Flex flex={1} safeArea>
      <HeaderBar onBack={() => navigation.goBack()} title="" />
      <Box px="20px" py="8px">
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Search..."
        />
      </Box>

      {loading ? (
        <Center width="100%" height="100%" py="8px">
          <Spinner accessibilityLabel="Loading..." />
        </Center>
      ) : (
        <FlatList
          refreshing={loading}
          p={4}
          data={docs}
          ItemSeparatorComponent={() => <Box h={8} />}
          renderItem={({item}) => {
            return (
              <MerchantCard
                key={item._id}
                title={item.companyName}
                subTitle={item.address[0]?.address}
                imageURL={{uri: item.profilePicture || defaultThumbnail}}
                onPress={() => {
                  appDispatch(merchantActions.merchant(item._id)).then(
                    (response) => {
                      if (response.type === 'merchant/merchant/fulfilled') {
                        navigation.push('Details');
                      }
                    },
                  );
                }}
              />
            );
          }}
          ListEmptyComponent={() => (
            <Center h={200}>
              <Text color={'gray.400'}>No results found</Text>
            </Center>
          )}
        />
      )}
    </Flex>
  );
};

export default SearchResults;
