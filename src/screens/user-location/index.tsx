import React, {useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';
import HeaderBar from '@whenly/components/HeaderBar';
import {Button, FlatList, FormControl, HStack, Icon, Input} from 'native-base';
import {Box, Flex, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';

import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import {authActions, selectAuthState, useAppDispatch} from '@whenly/redux';
import {MAP_BOX_TOKEN} from '@env';
import {useSelector} from 'react-redux';

const UserLocation = (props) => {
  const {navigation} = props;
  const {user} = useSelector(selectAuthState);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const appDispatch = useAppDispatch();

  const searchAddress = async (text: string) => {
    try {
      if (text.length > 3) {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
          text,
        )}.json`;

        const response = await axios.get(endpoint, {
          params: {
            access_token: MAP_BOX_TOKEN,
            country: 'PH',
            autocomplete: true,
          },
        });
        console.log('Response', response);
        if (response.status === 200) {
          setSuggestions(response.data.features);
        }
      }
    } catch (error) {
      console.log('Error fetching location suggestions', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSuggestion = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setSelectedAddress(item);
          setAddress(item.place_name);
        }}>
        <HStack py={2} px={2} alignItems="center">
          <Icon as={FontAwesome} name="location-arrow" mr={2} />
          <Text>{item.place_name}</Text>
        </HStack>
      </Pressable>
    );
  };

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Denied');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('Never ask again');
        }
      } catch (error) {
        console.log('Error', error);
        // NotificationService.error('Location Error', 'Error: ' + error)
      }
    } else {
      getLocation();
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      console.log(info);
      if (!!info.coords) {
        getAddress(info.coords.latitude, info.coords.longitude);
      }
    });
  };

  const getAddress = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`;
      const response = await axios.get(endpoint, {
        params: {
          access_token: MAP_BOX_TOKEN,
          country: 'IN',
          types: 'locality',
          autocomplete: true,
        },
      });

      console.log('RESPONSE', response);

      if (response.status === 200) {
        setSelectedAddress(response.data?.features[0]);
        setAddress(response.data?.features[0].place_name);
      }
    } catch (error) {
      console.log('Error getting address', error);
    } finally {
      setLoading(false);
    }
  };

  const submitLocation = async () => {
    try {
      const location = {
        address: selectedAddress?.place_name,
        lat: selectedAddress?.center[1],
        long: selectedAddress?.center[0],
        default: true,
      };

      await appDispatch(
        authActions.updateUser({id: user?.id, address: [location]}),
      );
      navigation.navigate('Home');
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <Flex safeArea flex={1} bg="white">
      <HeaderBar
        onBack={() => navigation.pop()}
        title={`Find Trainging \nClasses Near You`}
        headerRight={loading && <ActivityIndicator />}
      />
      <Box p="20px">
        <Text color="gray.500">
          {`Please enter your location to find \ntraining classes near you.`}
        </Text>
      </Box>
      <Box p="20px">
        <FormControl px={2}>
          <FormControl.Label>Search Location</FormControl.Label>
          <Input
            variant="underlined"
            onChangeText={(text) => {
              setLoading(true);

              setAddress(text);
              setSelectedAddress(null);
              searchAddress(text);
            }}
            onBlur={() => console.log('Blur')}
            placeholder="Address"
            value={address}
            InputRightElement={
              <>
                {address && (
                  <Pressable
                    onPress={() => {
                      setAddress('');
                      setSuggestions([]);
                      setSelectedAddress(null);
                    }}>
                    <Icon as={Ionicons} name="close-circle-outline" size={6} />
                  </Pressable>
                )}
              </>
            }
          />
        </FormControl>
        {!selectedAddress && (
          <FlatList
            refreshing={loading}
            data={suggestions}
            renderItem={renderSuggestion}
            ListEmptyComponent={
              !!address && !loading ? (
                <Box px={4}>
                  <EmptyListMessage
                    message={`Can't find locations.\nTry searching for something else.`}
                  />
                </Box>
              ) : (
                <></>
              )
            }
          />
        )}
        <HStack mt={8} space={2}>
          <Button
            variant="outline"
            borderColor="gray.300"
            borderWidth={1}
            borderRadius="2xl"
            leftIcon={
              <Icon
                as={Ionicons}
                name="location-sharp"
                color="primary.300"
                size={4}
              />
            }
            onPress={() => checkPermission()}>
            {'Use Current\nLocation'}
          </Button>
          <Button
            flex={1}
            borderRadius="2xl"
            disabled={!selectedAddress}
            onPress={submitLocation}>
            Next
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default UserLocation;
