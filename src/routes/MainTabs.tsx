import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@whenly/screens/home';
import Deals from '@whenly/screens/deals';
import Favorites from '@whenly/screens/favorites';
import {ProfileMain} from '@whenly/screens/profile';
import CustomIcon from '@whenly/components/CustomIcon';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#e6b200',
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: (props) => <CustomIcon {...props} name="home" />,
      }}
    />
    <Tab.Screen
      name="Deals"
      component={Deals}
      options={{
        tabBarIcon: (props) => <CustomIcon {...props} name="deals" />,
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{
        tabBarIcon: (props) => <CustomIcon {...props} name="favorites" />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileMain}
      options={{
        tabBarIcon: (props) => <CustomIcon {...props} name="profile" />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabs;
