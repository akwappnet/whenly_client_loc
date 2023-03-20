import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import {
  ProfileSchedules,
  ProfilePasses,
  ProfileActivities,
  EditProfile,
  Settings,
} from '@whenly/screens/profile';
import DetailsScreen from '@whenly/screens/merchantDetails';
import CheckoutScreen from '@whenly/screens/checkout';
import PaymentWebvew from '@whenly/screens/checkout/PaymentWebview';
import PaymentSuccess from '@whenly/screens/checkout/PaymentSuccess';
import UserLocation from '@whenly/screens/user-location';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Stack.Screen name="Tabs" component={MainTabs} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Schedule" component={ProfileSchedules} />
    <Stack.Screen name="Passes" component={ProfilePasses} />
    <Stack.Screen name="Activity" component={ProfileActivities} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="Payment" component={PaymentWebvew} />
    <Stack.Screen name="Success" component={PaymentSuccess} />
    <Stack.Screen name="UserLocation" component={UserLocation} />
  </Stack.Navigator>
);

export default MainStack;
