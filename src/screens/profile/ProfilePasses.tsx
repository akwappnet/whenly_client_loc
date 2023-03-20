import HeaderBar from '@whenly/components/HeaderBar';
import Card from '@whenly/components/Card';
import {Box, Button, Divider, FlatList, Icon, Stagger, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import Entypo from 'react-native-vector-icons/Entypo';
import {convertToCurrency} from '@whenly/utils/numbers';
import ProfileContainer from '@whenly/components/profile/ProfileContainer';

const dummySchedules = [
  {
    id: '1',
    name: 'Unlimited Gym Use Anytime Fitness',
    orderDate: 'Jan 1, 2022',
    duration: '1 Month',
    startDate: 'October 1, 2023',
    endDate: 'November 1, 2023',
    totalAmount: 200000,
  },
  {
    id: '2',
    name: 'Oct 19, 2022 5:00 pm Taekwondo IronForge Fitness',
    orderDate: 'Jan 1, 2022',
    duration: '1 Month',
    startDate: 'October 1, 2023',
    endDate: 'November 1, 2023',
    totalAmount: 200000,
  },
];
const ProfilePasses = (props: any) => {
  const [expandedSched, setExpandedSched] = useState<string | null>(null);

  const toggleExpandedSched = (id: string) => {
    setExpandedSched(expandedSched === id ? null : id);
  };

  function renderScheduleItem({item}: any) {
    const isOpen = expandedSched === item.id;
    return (
      <Box py={6}>
        <Box flexDirection={'row'}>
          <Text
            px={2}
            flex={2}
            fontWeight={'bold'}
            numberOfLines={2}
            fontSize={12}>
            {item.name}
          </Text>
          <Box flex={1}>
            <Button
              size="xs"
              variant={'outline'}
              justifyContent="center"
              padding={0}
              height={8}
              borderRadius={100}>
              Cancel
            </Button>
          </Box>
          <Box flex={1} flexDirection="row">
            <Button
              variant="ghost"
              height={8}
              size="xs"
              rightIcon={<Icon as={Entypo} name="chevron-small-down" />}
              fontSize={10}
              color="gray.500"
              onPress={() => toggleExpandedSched(item.id)}>
              Details
            </Button>
          </Box>
        </Box>
        {isOpen && (
          <Box width={'70%'} py={4}>
            <Divider />
            <Box my={4}>
              <Text color="gray.500" fontWeight={'bold'}>
                {item.duration}
              </Text>
              <Text color="gray.500">{item.startDate}</Text>
              <Text color="gray.500">{item.endDate}</Text>
            </Box>
            <Divider />
            <Box my={4} flexDirection="row" justifyContent={'space-between'}>
              <Text color="gray.300" fontStyle={'italic'}>
                Total Amount
              </Text>
              <Text color="gray.500" fontWeight={'bold'}>
                {convertToCurrency(item.totalAmount)}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <ProfileContainer
      title="My Passes"
      subtitle="These are the passes you purchased.">
      <Card>
        <FlatList
          data={dummySchedules}
          renderItem={renderScheduleItem}
          ListEmptyComponent={
            <EmptyListMessage message="You have not purchased any passes yet." />
          }
          ItemSeparatorComponent={() => <Divider />}
        />
      </Card>
    </ProfileContainer>
  );
};

export default ProfilePasses;
