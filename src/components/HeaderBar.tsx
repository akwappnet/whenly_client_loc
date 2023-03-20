import {Box, Flex, Heading, IconButton, VStack} from 'native-base';
import {ReactNode} from 'react';
import Feather from 'react-native-vector-icons/Feather';

interface HeaderBarProps {
  onBack?: () => void;
  title: string;
  headerRight?: ReactNode;
  white?: boolean;
}

const HeaderBar = ({onBack, headerRight, title, white}: HeaderBarProps) => {
  return (
    <VStack px="20px">
      <Flex direction="row">
        {onBack && (
          <IconButton
            onPress={() => onBack()}
            icon={
              <Feather
                name="chevron-left"
                size={24}
                color={white ? 'white' : 'black'}
              />
            }
          />
        )}

        <Box flex={1}></Box>
        {headerRight}
      </Flex>
      {title && <Heading>{title}</Heading>}
    </VStack>
  );
};

export default HeaderBar;
