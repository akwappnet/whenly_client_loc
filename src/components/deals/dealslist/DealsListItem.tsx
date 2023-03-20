import {AspectRatio, Box, Text} from 'native-base';

const DealsListItem = ({item}: {item: string}) => {
  return (
    <Box width={'100%'} my={4}>
      <AspectRatio
        ratio={2.35 / 1}
        backgroundColor="gray.300"
        borderRadius={'2xl'}></AspectRatio>
      <Box py={2}>
        <Text fontWeight="bold">{item}</Text>
        <Text color="gray.500" fontSize="xs">
          York, Toronto
        </Text>
      </Box>
    </Box>
  );
};

export default DealsListItem;
