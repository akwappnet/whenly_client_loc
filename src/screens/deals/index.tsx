import React from 'react';
import {Dimensions} from 'react-native';
import SearchBar from '@whenly/components/SearchBar';
import {Box, Flex, Heading, IconButton, ScrollView, VStack} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height} = Dimensions.get('screen');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import DealsList from '@whenly/components/deals/dealslist';

const Deals = () => {
  return (
    <SafeAreaView>
      <VStack space={4}>
        <Flex px="20px" mt={4} direction="row">
          <Box width="64%">
            <SearchBar
              value=""
              onChangeText={(text: string) => {}}
              placeholder="Search for deals...."
            />
          </Box>
        </Flex>
        <Box px="20px">
          <Heading>Deals</Heading>
        </Box>
        <Box>
          <DealsList />
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

export default Deals;
