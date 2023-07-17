import React from 'react';
import {Flex, Icon, IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';

const WebEmbed = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <Flex flex={1} safeArea bg="white">
      <IconButton
        m="4"
        onPress={() => navigation.goBack()}
        icon={<Icon as={Feather} size="xl" name="chevron-left" />}
        _icon={{color: 'black'}}
        borderRadius="full"
        color={'black'}
        alignSelf={'flex-start'}
      />
      <WebView style={{flex: 1}} source={{uri: route.params?.url || ''}} />
    </Flex>
  );
};

export default WebEmbed;
