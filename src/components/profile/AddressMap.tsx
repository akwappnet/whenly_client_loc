import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import Container from '@whenly/components/ContainerHOC';
import {
  Avatar,
  Button,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  TextArea,
  VStack,
  useTheme,
  Box,
  FormControl,
  FlatList,
} from 'native-base';
import Card from '@whenly/components/Card';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '@whenly/redux';
import {metric} from '@whenly/theme/theme';
import {MAP_BOX_TOKEN} from '@env';
import axios from 'axios';
import MapboxGL from '@rnmapbox/maps';

const ORIGIN = [122.5518675, 10.713929]; // Iloilo Near SM
MapboxGL.setAccessToken(MAP_BOX_TOKEN);
export interface IAddress {
  address: string;
  lat: number;
  long: number;
  default: boolean;
}

export interface IAddressMap {
  initialValue: IAddress | null | undefined;
}

const AddressMap = forwardRef((props: IAddressMap, ref) => {
  const {initialValue} = props;

  const [isLoading, setIsLoading] = useState(false);
  const [via, setVia] = useState('map');
  const [selectedAddress, setSelectedAddress] = useState(
    initialValue?.address || '',
  );
  const [coordinates, setCoordinates] = useState(
    initialValue ? [initialValue.long, initialValue.lat] : ORIGIN,
  );
  const [suggestions, setSuggestions] = useState([]);
  const userLocation = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        address() {
          if (selectedAddress === '' && coordinates === ORIGIN) {
            return null;
          }
          return {
            address: selectedAddress,
            lat: coordinates[1],
            long: coordinates[0],
            default: true,
          };
        },
        setAddress(address: IAddress) {
          setSelectedAddress(address.address);
          setCoordinates([address.long, address.lat]);
        },
      };
    },
    [coordinates, selectedAddress],
  );

  useEffect(() => {
    async function checkPermissions() {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Granted');
          } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Denied');
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Never ask again');
          }
        }
      } catch (error) {
        console.log('Error', error);
        // NotificationService.error('Location Error', 'Error: ' + error)
      }
    }
    checkPermissions();
  }, []);

  const onMapReady = async () => {
    // Do something here
  };

  const onRegionDidChange = async (feature) => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const {coordinates} = feature.geometry;
        if (via === 'map' && !isLoading) {
          const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json`;
          const response = await axios.get(endpoint, {
            params: {
              access_token: MAP_BOX_TOKEN,
              country: 'PH',
              types: 'locality',
              autocomplete: true,
            },
          });
          setCoordinates(coordinates);
          setSelectedAddress(response?.data?.features[0]?.place_name || '');
          setVia('map');
        }
      }, 200);
      setIsLoading(false);
    } catch (error) {
      console.log('onRegionDidChange', error);
      setIsLoading(false);
    }
  };

  const onUserLocationUpdate = (location) => {
    // if (!isEdit) {
    setCoordinates([location.coords.longitude, location.coords.latitude]);
    // }
  };

  const onChangeText = async (value: string) => {
    try {
      setSelectedAddress(value);
      setVia('search');
      // Start checking for suggestions with 3 keywords
      if (value.length > 3) {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
          value,
        )}.json`;

        const response = await axios.get(endpoint, {
          params: {
            access_token: MAP_BOX_TOKEN,
            country: 'PH',
            autocomplete: true,
          },
        });
        setSuggestions(response?.data?.features || []);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Card>
      <VStack space={2}>
        {/* <Heading size="sm">Address Map</Heading> */}
        <FormControl>
          <FormControl.Label>Address Line</FormControl.Label>
          <Input
            onChangeText={onChangeText}
            placeholder="Street, Brgy., Town, City"
            value={selectedAddress}
          />
        </FormControl>
        {suggestions && (
          <FlatList
            scrollEnabled={false}
            data={suggestions}
            renderItem={({item}) => {
              return (
                <Button
                  onPress={() => {
                    setVia('search');
                    setCoordinates(item.geometry.coordinates);
                    setSelectedAddress(item.place_name);
                    setSuggestions([]);
                  }}
                  variant={'outline'}
                  textAlign="left"
                  size="sm"
                  my={1}>
                  {item.place_name}
                </Button>
              );
            }}
          />
        )}
        <Text fontSize={'sm'} color="gray.500">
          Drag map to pin point location
        </Text>
        <Box flex={1} my={2} h={(metric.fullWidth * 9) / 16}>
          <MapboxGL.MapView
            logoEnabled={false}
            scaleBarEnabled={false}
            styleURL={MapboxGL.StyleURL.Street}
            onDidFinishLoadingMap={onMapReady}
            onRegionDidChange={onRegionDidChange}
            onTouchStart={(event) => {
              setVia('map');
            }}
            attributionEnabled={false}
            regionDidChangeDebounceTime={1000}
            style={styles.map}>
            <MapboxGL.Camera
              // animationMode="easeTo"
              animationDuration={3000}
              centerCoordinate={coordinates}
              zoomLevel={17}
            />
            <MapboxGL.UserLocation
              ref={userLocation}
              visible={false}
              onUpdate={onUserLocationUpdate}
              minDisplacement={1}
            />
          </MapboxGL.MapView>
          <Box position={'absolute'} left={'50%'} top={'50%'} size={1}>
            <Image
              position={'absolute'}
              tintColor={'primary.500'}
              alt="location-pin"
              bottom={0}
              right={-18}
              size={'xs'}
              resizeMode="contain"
              source={require('../../assets/images/marker.png')}
            />
          </Box>
        </Box>
      </VStack>
    </Card>
  );
});

export default AddressMap;

const styles = StyleSheet.create({
  photoLabel: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#e4e4e7',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 10,
  },
  map: {
    flex: 1,
  },
});
