import React, {useEffect, useState} from 'react';
import {Box, Text} from 'native-base';
import {Merchant} from '@whenly/redux';
import Collapse from '@whenly/components/Collapse';
import {capitalizeFirstLetter} from '@whenly/utils/string';
import {ScrollView, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
interface AboutMerchantProps {
  merchant: Merchant | null;
}

interface ContactDetail {
  [key: string]: string | undefined;
}
const AboutMerchant = ({merchant, user}: AboutMerchantProps) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigation = useNavigation();

  const contactLabelStyles = {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'gray.800',
  };
  const contactStyles = {
    fontSize: 11,
    color: 'gray.800',
  };

  useEffect(() => {
    setLatitude(user.address[0].lat);
    setLongitude(user.address[0].long);
  }, []);

  const contactDetails: ContactDetail = {
    phone: merchant?.companyNumber,
    email: merchant?.email,
    ...(merchant?.companySocial || {}),
  };
  return (
    <Box>
      <Collapse
        header={
          <Box>
            <Text fontWeight="bold">Map</Text>
          </Box>
        }
        content={
          <Box style={styles.container}>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              />
            </MapView>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                height: wp('10%'),
                width: wp('10%'),
                borderRadius: 100,
                alignSelf: 'flex-end',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewMapFullScreen', {User: user})
                }>
                <Image
                  source={require('../../assets/images/categories/ic_full_map.png')}
                  resizeMode="contain"
                  style={{
                    height: wp('6%'),
                    width: wp('6%'),
                    alignSelf: 'flex-end',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginRight: wp('5%'),
                  }}
                />
              </TouchableOpacity>
            </View>
          </Box>
        }
      />
      <Text fontSize={11} color="gray.500" my={2}>
        {merchant?.companyDescription}
      </Text>
      <Collapse
        header={
          <Box>
            <Text fontWeight="bold">Contact</Text>
          </Box>
        }
        content={
          <Box py={2}>
            {Object.keys(contactDetails).map((social: string) =>
              !!contactDetails[social] ? (
                <Box
                  key={social}
                  flexDirection="row"
                  justifyContent="space-between"
                  my={1}>
                  <Text {...contactLabelStyles}>
                    {capitalizeFirstLetter(social)}
                  </Text>
                  <Text {...contactStyles}>{contactDetails[social]}</Text>
                </Box>
              ) : null,
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default AboutMerchant;

export const styles = StyleSheet.create({
  container: {
    marginVertical: hp('2%'),
    height: hp('30%'),
  },
  map: {
    width: wp('90%'),
    // height: Dimensions.get('window').height,
    height: hp('29%'),
  },
  viewMapFull: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
  },
});
