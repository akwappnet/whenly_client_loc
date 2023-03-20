import React, {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {
  useAppDispatch,
  authActions,
  productActions,
  selectCurrentUser,
} from '@whenly/redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ClassList from '@whenly/components/home/classlist';
import CategoryList from '@whenly/components/home/categoryList';
import Featured from '@whenly/components/home/featured';
import SearchBar from '@whenly/components/SearchBar';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('screen');

const Home = (props) => {
  const appDispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    appDispatch(productActions.subscriptions());
    appDispatch(productActions.bookings());
  });

  useEffect(() => {
    if (
      !!currentUser &&
      currentUser.isPhoneVerified &&
      currentUser?.address?.length === 0
    ) {
      props.navigation.push('UserLocation');
    }
  });

  return (
    <Flex flex={1} safeAreaTop>
      <ScrollView>
        <VStack space={4} mb={'60px'}>
          <Box px="20px" py="8px">
            <SearchBar
              value=""
              onChangeText={(text: string) => {}}
              placeholder="Search for classes..."
            />
          </Box>
          <Featured />
          <ClassList />
          <CategoryList />
        </VStack>
      </ScrollView>
    </Flex>
  );
};

export default Home;

const styles = StyleSheet.create({});
