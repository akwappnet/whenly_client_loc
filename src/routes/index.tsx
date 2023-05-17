import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './Auth';
import MainStack from './MainStack';
import Splash from '@whenly/screens/Splash';
import {
  AUTH_STACK,
  MAIN_STACK,
  PHONE_VERIFICATION,
  WEB_EMBED,
} from '@whenly/constants';
import PhoneVerification from '../screens/auth/PhoneVerification';
import WebEmbed from '@whenly/screens/WebEmbed';

const Stack = createNativeStackNavigator();

const Routes = () => (
  <Stack.Navigator
    initialRouteName={'Splash'}
    screenOptions={{gestureEnabled: false, headerShown: false}}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name={AUTH_STACK} component={AuthStack} />
    <Stack.Screen name={PHONE_VERIFICATION} component={PhoneVerification} />
    <Stack.Screen name={MAIN_STACK} component={MainStack} />
    <Stack.Screen name={WEB_EMBED} component={WebEmbed} />
  </Stack.Navigator>
);

export default Routes;
