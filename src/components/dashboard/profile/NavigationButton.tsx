import {Text} from 'native-base';
import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

interface NavigationButtonProps {
  onPress: () => void;
  name: string;
}

export default function NavigationButton(props: NavigationButtonProps) {
  const getIconName = () => {
    switch (props.name) {
      case 'Schedule':
        return <Ionicon size={30} name="clipboard-outline" />;
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
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {getIconName()}
      <Text fontSize={10} mt={2} color="gray.500">
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}
