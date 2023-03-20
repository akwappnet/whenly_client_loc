import React from 'react';
import HeaderBar from '@whenly/components/HeaderBar';
import {Center, FlatList, Flex, Text} from 'native-base';
import {useSelector} from 'react-redux';
import {merchantActions, selectFavorites, useAppDispatch} from '@whenly/redux';
import MerchantCard from '@whenly/components/MerchantCard';
import {useNavigation} from '@react-navigation/native';
import {User} from '@types/alltypes';

const Favorites = () => {
  const navigation = useNavigation();
  const favorites = useSelector(selectFavorites);
  const appDispatch = useAppDispatch();
  console.log('Favorites', favorites);
  return (
    <Flex flex={1} safeAreaTop>
      <HeaderBar title="Favorites" />
      <FlatList
        data={favorites}
        renderItem={({item}: {item: User}) => {
          return (
            <MerchantCard
              key={item?.id}
              title={item?.companyName}
              subTitle={item?.address[0]?.address}
              imageURL={{uri: item.gallery[0] || item.profilePicture}}
              onPress={() => {
                appDispatch(merchantActions.merchant(item.id)).then(
                  (response) => {
                    if (response.type === 'merchant/merchant/fulfilled') {
                      navigation.navigate('Details');
                    }
                  },
                );
              }}
            />
          );
        }}
        ListEmptyComponent={() => (
          <Center h={200}>
            <Text color={'gray.400'}>No Favorites added yet</Text>
          </Center>
        )}
      />
    </Flex>
  );
};

export default Favorites;
