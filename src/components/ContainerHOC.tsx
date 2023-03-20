import React from 'react';
import {Box, Flex, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import HeaderBar from '@whenly/components/HeaderBar';

interface ContainerHOCProps {
  title: string;
  bg?: string;
  safeArea: boolean;
  subtitle?: string;
  backBtnVisible?: boolean;
  children: React.ReactNode;
}
const ContainerHOC = ({
  title,
  subtitle,
  children,
  backBtnVisible = true,
  safeArea = true,
  bg,
}: ContainerHOCProps) => {
  const navigation = useNavigation();

  return (
    <Flex flex={1} safeArea={safeArea} bg={bg}>
      <HeaderBar
        backBtnVisible={backBtnVisible}
        onBack={() => {
          navigation.goBack();
        }}
        title={title}
      />
      <Box flex={1} py={4}>
        {subtitle && (
          <Box px={4} mb={8}>
            <Text color="gray.500">{subtitle}</Text>
          </Box>
        )}
        {children}
      </Box>
    </Flex>
  );
};

export default ContainerHOC;
