import {Modal} from 'native-base';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const LoadingIndicator = ({visible}: {visible: boolean}) => {
  return (
    <Modal isOpen={visible}>
      <ActivityIndicator color="#FFF" />
    </Modal>
  );
};

export default LoadingIndicator;
