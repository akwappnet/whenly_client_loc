import React from 'react';
import {Avatar, Box, Center, Divider, FlatList, Text} from 'native-base';
import Card from '@whenly/components/Card';

const dummyInboxes = [
  // {
  //   id: '1',
  //   description: 'Reminder for your class on Wednesday January 18, 2023',
  //   avatar: 'https://avatars.githubusercontent.com/u/3229625?v=4',
  //   createdAt: new Date(),
  //   seen: false,
  // },
  // {
  //   id: '2',
  //   description: 'Reminder for your class on Wednesday January 18, 2023',
  //   avatar: 'https://avatars.githubusercontent.com/u/3229625?v=4',
  //   createdAt: new Date(),
  //   seen: false,
  // },
];

const InboxSection = () => {
  function renderInboxItem({item}: any) {
    return (
      <Box key={item.id} display="flex" flexDirection={'row'} p={4}>
        <Avatar source={{uri: item.avatar}} />
        <Box ml={2} flex={1}>
          <Text numberOfLines={2}>{item.description}</Text>
          <Text fontSize={8}>14 hours ago</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box px={'20px'}>
      <Card>
        <Text fontWeight={'bold'} mb={4}>
          Inbox
        </Text>
        <FlatList
          data={dummyInboxes}
          renderItem={renderInboxItem}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <Center h={200}>
              <Text color={'gray.400'}>No data available</Text>
            </Center>
          )}
        />
      </Card>
    </Box>
  );
};

export default InboxSection;
