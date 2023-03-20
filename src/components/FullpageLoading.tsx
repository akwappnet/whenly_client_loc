import {Modal} from 'native-base';
import React from 'react';
import {ActivityIndicator} from 'react-native';

export default function FullpageLoading({visible}: {visible: boolean}) {
  return (
    <Modal isOpen={visible}>
      <ActivityIndicator color="#FFF" />
    </Modal>
  );
}
