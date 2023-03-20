import {Text} from 'native-base';

interface MessageProps {
  message: string;
}
const EmptyListMessage = ({message}: MessageProps) => {
  return (
    <Text color="gray.400" textAlign={'center'} py={8}>
      {message}
    </Text>
  );
};

export default EmptyListMessage;
