import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import SearchBar from '@whenly/components/SearchBar';
import {Box, Center, FlatList, Flex, Heading, Text, VStack} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height} = Dimensions.get('screen');
import {getPlans, getClasses} from '@whenly/services';
import {
  MerchantClassItem,
  MerchantPackageItem,
} from '@whenly/components/merchantDetails';
import {useDebouncedCallback} from 'use-debounce';

const Deals = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [classes, setClasses] = useState([]);

  const fetchData = useDebouncedCallback(async () => {
    try {
      setIsLoading(true);
      const planResponse = await getPlans({
        status: 'active',
        discounted: true,
        page: 1,
        limit: 99999,
        keyword,
      });
      console.log('planResponse', planResponse);
      setPlans(planResponse?.data.docs || []);
      // Fetch classes for today
      const classesResponse = await getClasses({
        status: 'active',
        discounted: true,
        page: 1,
        limit: 99999,
        // date: moment().format('YYYY-MM-DD'),
        keyword,
      });
      console.log('classesResponse', classesResponse);
      setClasses(classesResponse?.data.docs || []);
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
      setIsLoading(false);
    }
  }, 1000);

  useEffect(() => {
    fetchData();
  }, [fetchData, keyword]);

  const data = [
    ...plans.map((v) => ({...v, type: 'plan'})),
    ...classes.map((v) => ({...v, type: 'class'})),
  ];
  console.log('Plans', plans);
  console.log('Plans', classes);
  console.log('Data', data);

  const renderItem = ({item}) => {
    return item.type === 'plan' ? (
      <MerchantPackageItem showMerchant={true} planData={item} />
    ) : (
      <MerchantClassItem showMerchant={true} classData={item} />
    );
  };

  return (
    <SafeAreaView>
      <VStack space={4}>
        <Flex px="20px" mt={4} direction="row">
          <Box width="100%">
            <SearchBar
              value={keyword}
              onChangeText={setKeyword}
              placeholder="Search for deals...."
            />
          </Box>
        </Flex>
        <Box px="20px">
          <Heading>Deals</Heading>
        </Box>
        <FlatList
          p={4}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Center h={200}>
              <Text color={'gray.400'}>
                {keyword ? 'No results found' : 'No deals available'}
              </Text>
            </Center>
          )}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default Deals;
