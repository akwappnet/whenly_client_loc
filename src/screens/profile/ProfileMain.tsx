import React from 'react';
import {Alert} from 'react-native';
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  VStack,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationButton from '@whenly/components/dashboard/profile/NavigationButton';
import InboxSection from '@whenly/components/profile/InboxSection';
import HeaderBar from '@whenly/components/HeaderBar';
import {useAppDispatch, authActions, selectAuthState} from '@whenly/redux';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ProfileMain = (props: any) => {
  const {user} = useSelector(selectAuthState);
  const appDispatch = useAppDispatch();
  // const navigation = useNavigation()
  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'You are about to log out. Do you want to proceed?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => {
            appDispatch(authActions.logout());
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView>
      <HeaderBar
        title=""
        // headerRight={
        //   <IconButton size="lg" onPress={handleLogout}>
        //     <MaterialIcons name="logout" size={24} />
        //   </IconButton>
        // }
      />
      <VStack space={2}>
        <Center py={6}>
          <Avatar
            bg="gray.300"
            size="xl"
            source={
              user?.profilePicture
                ? {uri: user?.profilePicture}
                : require('../../assets/images/default_profile.png')
            }
          />
        </Center>
        <Center>
          <Heading>{`${user?.firstName} ${user?.lastName}`}</Heading>
          <Button
            onPress={() => props.navigation.navigate('EditProfile')}
            size="sm"
            borderRadius={'xl'}
            mt={2}>
            Edit Profile
          </Button>
        </Center>
        <HStack alignItems={'stretch'} space={8} justifyContent="center" my={6}>
          <NavigationButton
            name="Schedule"
            onPress={() => {
              props.navigation.push('Schedule');
            }}
          />
          <NavigationButton
            name="Passes"
            onPress={() => {
              props.navigation.push('Passes');
            }}
          />
          <NavigationButton
            name="Activity"
            onPress={() => {
              props.navigation.push('Activity');
            }}
          />
          <NavigationButton
            name="Settings"
            onPress={() => {
              props.navigation.push('Settings');
            }}
          />
        </HStack>

        <InboxSection />
      </VStack>
    </SafeAreaView>
  );
};

export default ProfileMain;
