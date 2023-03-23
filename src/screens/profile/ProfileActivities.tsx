import ProfileContainer from '@whenly/components/profile/ProfileContainer';
import Card from '@whenly/components/Card';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import {Box, Divider, FlatList} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Text} from 'native-base';
import {useAppDispatch, authActions, selectAuthState} from '@whenly/redux';
import moment from 'moment';
import {ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import colors from 'native-base/lib/typescript/theme/base/colors';
import {isEmptyArray} from 'formik';
const {height} = Dimensions.get('screen');

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
  const [paginationres, setPaginationres] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const appDispatch = useAppDispatch();
  useEffect(() => {
    getActivityApiCall();
  }, []);

  const getActivityApiCall = async () => {
    setLoadMoreLoading(true);
    const response = await appDispatch(authActions.getActivityListApi(page));
    if (!isEmptyArray(response.payload.data.docs)) {
      setLoadMoreLoading(false);
      setActivities(response.payload.data.docs);
    } else {
      setLoadMoreLoading(false);
    }
    setPaginationres(response.payload.data);
  };

  const loadMoreData = async () => {
    // setPaginationres(...response.payload.data);
    // let pageCount = page + 1;
    // console.log('pageCount', pageCount);

    if (paginationres.nextPage !== null) {
      setLoadMoreLoading(true);
      const response = await appDispatch(
        authActions.getActivityListApi(page + 1),
      );
      setPage(page + 1);
      if (!isEmptyArray(response.payload.data.docs)) {
        setLoadMoreLoading(false);
        setActivities([...activities, ...response.payload.data.docs]);
        setPaginationres(response.payload.data);
      } else {
        setLoadMoreLoading(false);
      }
    } else {
      setLoadMoreLoading(false);
    }
  };
  function renderActivityItem({item}) {
    return (
      <Box key={item.id} flexDirection="column" py={4}>
        <Text color="gray.900">{item.description}</Text>
        <Text color="gray.500" fontSize={10}>{`${moment(item.createdAt).format(
          'MMMM Do YYYY, h:mm:ss a',
        )}`}</Text>
      </Box>
    );
  }

  const listFooterComponent = () => {
    return (
      <>
        {loadMoreLoading ? (
          <ActivityIndicator color={'red'} size="large" />
        ) : null}
      </>
    );
  };
  return (
    <ProfileContainer
      title="My Activities"
      subtitle="You can find all the records of your activities here.">
      <Card>
        <FlatList
          data={activities}
          renderItem={renderActivityItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <EmptyListMessage message="Nothing to see here!" />
          }
          height={height * 0.55}
          // onEndReachedThreshold={0.2}
          onEndReached={loadMoreData}
          ListFooterComponent={listFooterComponent}
          ItemSeparatorComponent={() => <Divider />}
        />
      </Card>
    </ProfileContainer>
  );
};
export default ProfileActivities;
