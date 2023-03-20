import {Box, Heading, VStack} from 'native-base';
import {Dimensions, FlatList} from 'react-native';
import DealsListItem from './DealsListItem';
const {height} = Dimensions.get('screen');

const DealsList = () => {
  const renderItem = ({item}) => {
    return <DealsListItem item={item} />;
  };

  return (
    <Box px="20px">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={['IronForge Fitness', 'Strength Ground Fitness']}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <Heading size={'sm'} color="#484451" mb={4}>
            Exclusive deals just for you
          </Heading>
        )}
        ListFooterComponent={() => <Box height={height * 0.2} />}
      />
    </Box>
  );
};

export default DealsList;
