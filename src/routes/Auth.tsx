import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword, Login, Register, Welcome} from '@whenly/screens/auth';
import {WELCOME, LOGIN, REGISTER, FORGOT_PASSWORD} from '@whenly/constants';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName={LOGIN}
    screenOptions={{headerShown: false, gestureEnabled: false}}>
    {/* <Stack.Screen name={WELCOME} component={Welcome} /> */}
    <Stack.Screen name={LOGIN} component={Login} />
    <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
    <Stack.Screen name={REGISTER} component={Register} />
  </Stack.Navigator>
);

export default AuthStack;
