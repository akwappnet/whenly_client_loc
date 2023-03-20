import React from 'react';
import CustomIcon from '@whenly/components/CustomIcon';
import {Text, useTheme} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

interface NavigationButtonProps {
  onPress: () => void;
  name: string;
}

const NavigationButton = (props: NavigationButtonProps) => {
  const {colors} = useTheme();
  const getIconName = () => {
    switch (props.name) {
      case 'Earnings':
        return (
          <CustomIcon color={colors.primary[500]} size={30} name="pesos" />
        );
      case 'Passes':
        return <Feather size={30} name="calendar" />;
      case 'Activity':
        return <MaterialCommunityIcon size={30} name="history" />;
      case 'Settings':
        return <SimpleLineIcon size={30} name="settings" />;
      default:
        return <></>;
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      {getIconName()}
      <Text fontSize={10} mt={2} color="gray.500">
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
