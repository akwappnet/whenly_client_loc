import React, {useEffect, useState} from 'react';
import {Box, Text} from 'native-base';
import {
  Merchant,
  productActions,
  selectMerchantState,
  useAppDispatch,
} from '@whenly/redux';
import Collapse from '@whenly/components/Collapse';
import {capitalizeFirstLetter} from '@whenly/utils/string';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {theme} from '@whenly/theme/theme';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'native-base';
import {FlatList} from 'react-native';
import {Divider} from 'native-base';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import {AirbnbRating} from 'react-native-ratings';
import {useSelector} from 'react-redux';
interface AboutMerchantProps {
  merchant: Merchant | null;
}

interface ContactDetail {
  [key: string]: string | undefined;
}
const AboutMerchant = ({user}: AboutMerchantProps) => {
  const {height} = Dimensions.get('screen');
  const {merchant} = useSelector(selectMerchantState);
  const [initialRegion, setInitialRegion] = useState(null);
  const appDispatch = useAppDispatch();
  const [reviewData, setReviewData] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
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
    setLatitude(user?.address[0] ? user?.address[0]?.lat : 0.0);
    setLongitude(user?.address[0] ? user?.address[0]?.long : 0.0);
    getReviewAnswerApi(merchant?.id);
  }, []);

  useEffect(() => {
    const initialVisibleReviews = reviewData.slice(0, 3);
    setVisibleReviews(initialVisibleReviews);
  }, [reviewData]);

  const contactDetails: ContactDetail = {
    phone: merchant?.companyNumber,
    email: merchant?.email,
    ...(merchant?.companySocial || {}),
  };

  const handleSeeAll = () => {
    setVisibleReviews(reviewData); // Set visibleReviews to contain all reviews
    setShowAll(true); // Set showAll to true
  };

  const getReviewAnswerApi = async (merchantId) => {
    try {
      const response = await appDispatch(
        productActions.getReviewData(merchantId),
      );
      if (response.payload.length > 0) {
        setReviewData(response.payload);
      } else {
        console.log('else');
      }
    } catch (error) {
      console.log('@@@@@@@@@@@@error', error);
    }
  };
  const renderReviewData = ({item}) => {
    return (
      <View style={styles.Viewcontainer}>
        <View style={{paddingTop: 12}}>
          <Image
            style={styles.clientImageStyle}
            source={require('../../assets/images/banner/2.png')}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.textStye}>{`${item?.customer?.firstName}`}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textStye}>{`Ratings :`}</Text>
            <AirbnbRating
              count={5}
              // reviewSize={2}
              reviews={['Poor', 'Poor', 'Good', 'Good', 'Excellent']}
              defaultRating={item.rating}
              isDisabled={true}
              showRating={false}
              size={12}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            {/* <Text style={styles.textStye}>{`Comments:`}</Text> */}
            <Text style={styles.textStyeSub}>{`${
              item?.answerList.length > 4 ? item?.answerList[4]?.answer : ''
            }`}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Box>
      <ScrollView showsHorizontalScrollIndicator={false} py="55px">
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
        <Collapse
          header={
            <Box>
              <Text fontWeight="bold">Review</Text>
            </Box>
          }
          content={
            <View>
              {!showAll && (
                <TouchableOpacity
                  style={styles.checkInButton}
                  onPress={() => handleSeeAll()}>
                  <Text style={styles.buttonTextStyle}>{'See All'}</Text>
                </TouchableOpacity>
              )}

              <FlatList
                data={visibleReviews}
                style={styles.mainContainerStyle}
                renderItem={renderReviewData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <EmptyListMessage message="Nothing to see here!" />
                }
                // height={height * 0.55}
                // onEndReachedThreshold={0.2}
                // onEndReached={loadMoreData}
                // ListFooterComponent={listFooterComponent}
                ItemSeparatorComponent={() => <Divider />}
              />
            </View>
          }
        />
      </ScrollView>
    </Box>
  );
};

export default AboutMerchant;

export const styles = StyleSheet.create({
  container: {
    marginVertical: hp('2%'),
    height: hp('30%'),
  },
  Viewcontainer: {
    flexDirection: 'row',
    marginHorizontal: wp('2%'),
    marginVertical: hp('2%'),
  },
  map: {
    width: wp('90%'),
    // height: Dimensions.get('window').height,
    height: hp('30%'),
  },
  viewMapFull: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
  },
  subContainer: {
    flexDirection: 'column',
    marginHorizontal: wp('4%'),
    // alignItems: 'center',
    width: wp('60%'),
    // alignSelf: 'center',
  },
  mainContainerStyle: {
    marginHorizontal: wp('2%'),
  },
  textStye: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
  },
  clientImageStyle: {
    height: wp('10%'),
    width: wp('10%'),
    overflow: 'hidden',
    borderWidth: wp('0.5%'),
    borderRadius: 100,
    // borderColor: 'red',
    // backgroundColor: 'red',
  },
  textStyeSub: {
    fontSize: 12,
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: 'black',
  },
  checkInButton: {
    paddingHorizontal: wp('2%'),
    borderRadius: 15,
    borderWidth: wp('0.6%'),
    marginVertical: wp('1%'),
    borderColor: theme.colors.gray[300],
    // backgroundColor: theme.colors.primary[300],
    marginHorizontal: wp('4%'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});
