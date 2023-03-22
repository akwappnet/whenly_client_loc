import ProfileContainer from '@whenly/components/profile/ProfileContainer';
import Card from '@whenly/components/Card';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import {Box, Divider, FlatList} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Text} from 'native-base';
import {useAppDispatch, authActions, selectAuthState} from '@whenly/redux';
import moment from 'moment';
import {ScrollView} from 'react-native';

const dummyActivities = [
  {
    id: 1,
    description:
      'Missed: Taekwondo at X on Oct 27, 2022 at 9:00 am with Coach N',
    date: new Date(),
  },
  {
    id: 2,
    description:
      'Missed: Taekwondo at X on Oct 27, 2022 at 9:00 am with Coach N',
    date: new Date(),
  },
  {
    id: 3,
    description:
      'Missed: Taekwondo at X on Oct 27, 2022 at 9:00 am with Coach N',
    date: new Date(),
  },
  {
    id: 4,
    description:
      'Missed: Taekwondo at X on Oct 27, 2022 at 9:00 am with Coach N',
    date: new Date(),
  },
];

const ProfileActivities = () => {
  const [activities, setActivities] = useState([]);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    getActivityApiCall();
  }, []);

  const getActivityApiCall = async () => {
    const response = await appDispatch(authActions.getActivityListApi());
    setActivities(response?.payload);
  };
  function renderActivityItem({item}) {
    return (
      <Box key={item.id} flexDirection="column" py={4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text color="gray.900">{item.description}</Text>
          <Text color="gray.500" fontSize={10}>{`${moment(
            item.createdAt,
          ).format('MMMM Do YYYY, h:mm:ss a')}`}</Text>
        </ScrollView>
      </Box>
    );
  }

  return (
    <ProfileContainer
      title="My Activities"
      subtitle="You can find all the records of your activities here.">
      <Card>
        <FlatList
          data={activities}
          renderItem={renderActivityItem}
          ListEmptyComponent={
            <EmptyListMessage message="Nothing to see here!" />
          }
          ItemSeparatorComponent={() => <Divider />}
        />
      </Card>
    </ProfileContainer>
  );
};
export default ProfileActivities;
