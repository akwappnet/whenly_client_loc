import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Actionsheet,
} from 'native-base';
import Card from '@whenly/components/Card';
import {metric} from '@whenly/theme/theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import imagePlaceHolder from '../../assets/images/gallery_placeholder.png';

export interface IGallery {
  initialData: string;
  data: any;
  onChange: (image: any) => void;
}

const Gallery = ({initialData, data, onChange}: IGallery) => {
  const [showPicker, setShowPicker] = useState(false);
  const w = metric.fullWidth;
  const h = (w * 16) / 9;
  console.log('adat', data);
  // const count = Math.max(galleryUpload.length, initialData.length);

  const onSelectImageSource = async (source) => {
    try {
      let file = data;
      if (source === 'camera') {
        //   const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.CAMERA,
        //     {
        //       title: 'App Camera Permission',
        //       message: 'App needs access to your camera ',
        //       buttonNeutral: 'Ask Me Later',
        //       buttonNegative: 'Cancel',
        //       buttonPositive: 'OK',
        //     },
        //   );
        //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     console.log('Camera permission given');
        const {assets} = await launchCamera({
          mediaType: 'photo',
          maxHeight: 800,
          maxWidth: 800,
          quality: 0.8,
          includeBase64: true,
        });
        console.log('assets', assets);
        file = assets[0];
      } else {
        const {assets} = await launchImageLibrary({
          mediaType: 'photo',
          maxHeight: 800,
          maxWidth: 800,
          quality: 0.8,
          includeBase64: true,
        });
        console.log('assets', assets);
        file = assets[0];
      }
      onChange(file);
      // setTimeout(() => {
      // }, 300);
      setShowPicker(false);
    } catch (error) {
      console.log('error', error);
      setShowPicker(false);
    }
  };

  const parseImageSource = () => {
    console.log('Image', data);
    if (data) {
      return {uri: `data:image/jpg;base64,${data.base64}`};
    }

    if (initialData) {
      return {uri: initialData};
    }

    return false;
  };

  return (
    <Card>
      <VStack space={2}>
        {/* <Heading size="sm">Gallery</Heading> */}
        <HStack space={2} alignItems={'center'}>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Image
              alt="gallery-image"
              height={w}
              width={h}
              resizeMode="cover"
              fallbackSource={imagePlaceHolder}
              source={parseImageSource() || imagePlaceHolder}
            />
            <Text style={styles.photoLabel}>Main Photo</Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
      <Actionsheet isOpen={showPicker} onClose={() => setShowPicker(false)}>
        <Actionsheet.Content>
          <VStack w="100%" space={4} my={4} px={4}>
            <Heading size="md" mb={4}>
              Select Image Source
            </Heading>
            <Button onPress={() => onSelectImageSource('camera')}>
              Take Photo
            </Button>
            <Button onPress={() => onSelectImageSource('gallery')}>
              Open Gallery
            </Button>
            <Button onPress={() => setShowPicker(false)} variant={'outline'}>
              Cancel
            </Button>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Card>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  photoLabel: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});
