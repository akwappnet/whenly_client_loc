import React, {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {Center} from 'native-base';
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useAppDispatch, authActions, selectAuthState} from '@whenly/redux';
import {useSelector} from 'react-redux';
import {AUTH_STACK, MAIN_STACK, PHONE_VERIFICATION} from '@whenly/constants';
import OneSignal from 'react-native-onesignal';

const {width} = Dimensions.get('screen');

const Splash = () => {
  const focused = useIsFocused();
  const appDispatch = useAppDispatch();
  const {user, loading} = useSelector(selectAuthState);
  const navigation = useNavigation();

  const anim = useRef(null);

  useEffect(() => {
    appDispatch(authActions.currentUser());
  }, [appDispatch]);

  useEffect(() => {
    // Reset animation on focus
    if (anim.current) {
      anim.current?.reset();
      anim.current?.play();
    }
  }, [focused]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        OneSignal.setExternalUserId(user.id);
        // Pass in email provided by customer
        OneSignal.setEmail(user.email);

        // Pass in phone number provided by customer
        OneSignal.setSMSNumber(user.phoneNumber);

        // if (user.isPhoneVerified) {
        navigation.navigate(MAIN_STACK);
        // } else {
        //   navigation.navigate(PHONE_VERIFICATION);
        // }
      } else {
        navigation.navigate(AUTH_STACK);
      }
      // navigation.navigate(user ? MAIN_STACK : AUTH_STACK, {});
    }
  }, [loading, navigation, user]);

  return (
    <Center flex={1} bg={'primary.500'}>
      <LottieView
        ref={anim}
        source={require('../assets/lottie/text_mark_blk.json')}
        autoPlay
        loop
        style={{width: width}}
      />
    </Center>
  );
};

export default Splash;
