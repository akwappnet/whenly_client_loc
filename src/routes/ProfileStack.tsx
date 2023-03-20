import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ProfileMain,
  ProfileSchedules,
  ProfilePasses,
  ProfileActivities,
} from 'screens/profile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Stack.Screen name="Main" component={ProfileMain} />
  </Stack.Navigator>
);

export default ProfileStack;
