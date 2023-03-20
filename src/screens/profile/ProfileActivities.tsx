import ProfileContainer from '@whenly/components/profile/ProfileContainer';
import Card from '@whenly/components/Card';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import {Box, Divider, FlatList} from 'native-base';
import React from 'react';
import {Text} from 'native-base';

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

export default function ProfileActivities() {
  function renderActivityItem({item}: any) {
    return (
      <Box key={item.id} flexDirection="column" py={4}>
        <Text color="gray.900">{item.description}</Text>
        <Text color="gray.500" fontSize={10}>{`${item.date}`}</Text>
      </Box>
    );
  }
  return (
    <ProfileContainer
      title="My Activities"
      subtitle="You can find all the records of your activities here.">
      <Card>
        <FlatList
          data={dummyActivities}
          renderItem={renderActivityItem}
          ListEmptyComponent={
            <EmptyListMessage message="Nothing to see here!" />
          }
          ItemSeparatorComponent={() => <Divider />}
        />
      </Card>
    </ProfileContainer>
  );
}
