import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, IconButton, HStack} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, authActions, selectAuthState} from '@whenly/redux';
import {useSelector} from 'react-redux';

const SocialLogin = () => {
  const appDispatch = useAppDispatch();
  const {error, loading} = useSelector(selectAuthState);
  return (
    <HStack space={4} justifyContent={'center'}>
      <IconButton
        onPress={() => {
          appDispatch(authActions.googleLogin());
        }}
        icon={<Icon as={FontAwesome5} size={10} name="google" />}
        borderRadius="full"
        _icon={{color: '#DB4437'}}
        _pressed={{bg: '#f8dad7'}}
        alignSelf={'flex-start'}
      />
      <IconButton
        onPress={() => {
          appDispatch(authActions.facebookLogin());
        }}
        icon={<Icon as={FontAwesome5} size={10} name="facebook" />}
        borderRadius="full"
        _icon={{color: '#4267B2'}}
        _pressed={{bg: '#d9e1f0'}}
        alignSelf={'flex-start'}
      />
      {/* <IconButton
        variant={'ghost'}
        icon={<Icon as={FontAwesome5} size={10} name="apple" />}
        borderRadius="full"
        _icon={{color: 'black'}}
        _pressed={{bg: '#cccccc'}}
        alignSelf={'flex-start'}
      /> */}
    </HStack>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({});
