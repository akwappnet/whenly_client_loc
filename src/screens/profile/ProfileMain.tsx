import React from 'react';
import {
  Avatar,
  Button,
  Center,
  Heading,
  HStack,
  VStack,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavigationButton from '@whenly/components/dashboard/profile/NavigationButton';
import HeaderBar from '@whenly/components/HeaderBar';
import {useAppDispatch, selectAuthState} from '@whenly/redux';
import {useSelector} from 'react-redux';
import ActivityLog from '@whenly/components/profile/ActivityLog';

const ProfileMain = (props: any) => {
  const {user} = useSelector(selectAuthState);
  const appDispatch = useAppDispatch();
  // const navigation = useNavigation()
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
      <VStack space={2} mb={20}>
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
          {/* <NavigationButton
            name="Activity"
            onPress={() => {
              props.navigation.push('Activity');
            }}
          /> */}
          <NavigationButton
            name="Settings"
            onPress={() => {
              props.navigation.push('Settings');
            }}
          />
        </HStack>
        {/* <InboxSection /> */}
        {/* <ProfileActivities /> */}
        <ActivityLog />
      </VStack>
    </SafeAreaView>
  );
};

export default ProfileMain;
