import HeaderBar from '@whenly/components/HeaderBar';
import {Box, Text} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ProfileContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}
const ProfileContainer = ({
  title,
  subtitle,
  children,
}: ProfileContainerProps) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <HeaderBar
        onBack={() => {
          navigation.pop();
        }}
        title={title}
      />
      <Box px={'20px'} py={4}>
        <Box width={'64%'} mb={8}>
          <Text color="gray.500">{subtitle}</Text>
        </Box>
        {children}
      </Box>
    </SafeAreaView>
  );
};

export default ProfileContainer;
