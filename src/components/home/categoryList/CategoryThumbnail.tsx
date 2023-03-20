import {Center, Heading} from 'native-base';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const thumbnailWidth = width * 0.33;

interface CategoryThumbnailProps {
  category: string;
}
const CategoryThumbnail = ({category}: CategoryThumbnailProps) => {
  return (
    <Center
      height={thumbnailWidth}
      width={thumbnailWidth}
      backgroundColor="gray.300"
      borderRadius="2xl"
      p="20px">
      <Heading size="md">{category}</Heading>
    </Center>
  );
};

export default CategoryThumbnail;
