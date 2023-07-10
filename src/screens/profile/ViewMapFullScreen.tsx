import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HeaderBar from '@whenly/components/HeaderBar';
import MapView, {Marker} from 'react-native-maps';
const ViewMapFullScreen = (props) => {
  const {navigation, route} = props;
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    setLatitude(
      route?.params?.User?.address[0]?.lat
        ? route?.params?.User?.address[0]?.lat
        : 0.0,
    );
    setLongitude(
      route?.params?.User?.address[0]?.long
        ? route?.params?.User?.address[0]?.long
        : 0.0,
    );
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBar white onBack={() => navigation.goBack()} title="" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        zoomControlEnabled={true}>
        <Marker
          draggable
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
        />
      </MapView>
      {/* <View
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
      </View> */}
    </View>
  );
};

export default ViewMapFullScreen;
export const styles = StyleSheet.create({
  container: {height: hp('100%')},
  map: {
    flex: 1,
  },
  viewMapFull: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
  },
});
