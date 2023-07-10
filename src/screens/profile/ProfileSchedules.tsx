import HeaderBar from '@whenly/components/HeaderBar';
import Card from '@whenly/components/Card';
import {
  Box,
  Button,
  Divider,
  Icon,
  Stagger,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import EmptyListMessage from '@whenly/components/EmptyListMessage';
import Entypo from 'react-native-vector-icons/Entypo';
import {convertToCurrency} from '@whenly/utils/numbers';
import ProfileContainer from '@whenly/components/profile/ProfileContainer';
import {
  useAppDispatch,
  authActions,
  productActions,
  selectCurrentUser,
  selectBookings,
  classActions,
  selectQuestion,
  selectLatestReviewBooking,
  submitReviewget,
} from '@whenly/redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {errorToast, successToast} from '@whenly/utils/useToast';
import {Image} from 'native-base';
import {Pressable} from 'native-base';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {KeyboardAvoidingView} from 'react-native';
import {Platform} from 'react-native';
import {isMatch} from 'date-fns';
import {ProfileStyle} from './ProfileStyle';
import {Input} from 'native-base';
import {TouchableWithoutFeedback} from 'react-native';
import {Linking} from 'react-native';
import {isEmptyArray} from 'formik';

const dummySchedules = [
  {
    id: '1',
    name: 'Unlimited Gym Use Anytime Fitness',
    orderDate: 'Jan 1, 2022',
    duration: '1 Month',
    startDate: 'October 1, 2023',
    endDate: 'November 1, 2023',
    totalAmount: 200000,
  },
  {
    id: '2',
    name: 'Oct 19, 2022 5:00 pm Taekwondo IronForge Fitness',
    orderDate: 'Jan 1, 2022',
    duration: '1 Month',
    startDate: 'October 1, 2023',
    endDate: 'November 1, 2023',
    totalAmount: 200000,
  },
];
let selectedItem;
const ProfileSchedules = (props: any) => {
  const appDispatch = useAppDispatch();
  const schedules = useSelector(selectBookings);
  const questions = useSelector(selectQuestion);
  const reviewData = useSelector(submitReviewget);
  const [refreshing, setRefreshing] = useState(false);
  const latestReviewBooking = useSelector(selectLatestReviewBooking);
  const [scheduleData, setScheduleData] = useState([]);
  const [expandedSched, setExpandedSched] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedEndTimeValue, setSelectedEndTimeValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewPageCount, setReviewPageCount] = useState(1);
  const [commentReview, setCommentReview] = useState('');
  const [isSelectedYes, setIsSelectedYes] = useState('');
  const [isSelectedNo, setIsSelectedNo] = useState('');
  const [isSelectedYesSecond, setIsSelectedYesSecond] = useState('');
  const [isSelectedNoSecond, setIsSelectedNoSecond] = useState('');

  const toggleExpandedSched = (id: string) => {
    setExpandedSched(expandedSched === id ? null : id);
  };

  useEffect(() => {
    getClassBookingData();
    // appDispatch(productActions.bookings());
    appDispatch(productActions.reviewQuestions());
  }, [appDispatch]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     appDispatch(productActions.latestBookingReview());
  //     console.log('@@@@@latestBookingReview', latestReviewBooking);
  //     if (
  //       !isEmptyArray(latestReviewBooking) &&
  //       latestReviewBooking.length > 0
  //     ) {
  //       console.log('@@@@@@@@@@@@');
  //       openModal();
  //     } else {
  //       console.log('!!!!!!!!!');
  //     }
  //   }, 30 * 60 * 1000); // 30 minutes in milliseconds

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  // // console.log('schedules', schedules, '@@@@@@@question', questions);
  useEffect(() => {
    const timer = setTimeout(() => console.log('Initial timeout!'), 1000);
  }, []);

  const getClassBookingData = async () => {
    const response = await appDispatch(productActions.bookings());
    if (!isEmptyArray(response.payload.docs)) {
      setScheduleData(response.payload.docs);
    } else {
      console.log('@@@@error');
    }
  };

  const onCancel = (classId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {text: 'Cancel', onPress: () => {}},
        {
          text: 'Yes',
          onPress: () => {
            appDispatch(classActions.cancelBooking(classId))
              .then((response) => {
                console.log('Response', response);
                appDispatch(productActions.bookings());
                successToast(
                  'Booking Cancelled',
                  'Booking cancelled successfully',
                );
              })
              .catch((error) => {
                console.log('Error', error);
                errorToast(
                  'Error',
                  'Something went wrong. Please try again later',
                );
              });
          },
        },
      ],
    );
  };

  const ratingCompleted = (rating) => {
    setRating(rating);
    const reviews = ['Poor', 'Poor', 'Good', 'Good', 'Excellent'];
    const selectedReview = reviews[rating - 1];
    setSelectedValue(selectedReview);
  };

  const ratingCompletedendTime = (rating) => {
    const reviews = ['Difficult', 'Difficult', 'Okay', 'Okay', 'Easy'];
    const selectedReview = reviews[rating - 1];
    setSelectedEndTimeValue(selectedReview);
  };

  const handleSubmit = (values) => {
    if (values === 'yesEffective') {
      setIsSelectedYes('Yes');
      setIsSelectedNo('');
    } else if (values === 'NoEffective') {
      setIsSelectedNo('No');
      setIsSelectedYes('');
    } else if (values === 'endTimeYes') {
      setIsSelectedYesSecond('Yes');
      setIsSelectedNoSecond('');
    } else if (values === 'endTimeNo') {
      setIsSelectedNoSecond('No');
      setIsSelectedYesSecond('');
    }
  };

  const setNextPage = () => {
    setReviewPageCount(reviewPageCount + 1);
  };

  const onPressSubmitReview = async () => {
    try {
      const payload = {
        bookingId: selectedItem?._id,
        classId: selectedItem?.classId,
        rating: rating,
        merchantId: selectedItem?.merchant?._id,
        answerList: [
          {
            questionId: questions[0]?.id,
            answer: isSelectedYes === 'Yes' ? isSelectedYes : 'No',
          },
          {
            questionId: questions[1]?.id,
            answer: selectedValue,
          },
          {
            questionId: questions[2]?.id,
            answer: selectedEndTimeValue,
          },
          {
            questionId: questions[3]?.id,
            answer: isSelectedYesSecond === 'Yes' ? isSelectedYesSecond : 'No',
          },
          {
            questionId: questions[4]?.id,
            answer: commentReview,
          },
        ],
      };
      const response = await appDispatch(
        productActions.submitReviewQuestions(payload),
      );
      setModalVisible(!modalVisible);
      selectedItem = null;
    } catch (error) {
      console.log('Error', error);
    }
  };

  const openGoogleMeetLink = async (meetLink) => {
    try {
      await Linking.openURL(meetLink);
    } catch (error) {
      console.log(
        'An error occurred while opening the Google Meet link:',
        error,
      );
    }
  };

  const onRefresh = () => {
    getClassBookingData();
  };

  const openModal = (item) => {
    setModalVisible(!modalVisible);
    selectedItem = item;
    if (modalVisible === false) {
      setIsSelectedNo('');
      setIsSelectedYes('');
      setIsSelectedNoSecond('');
      setIsSelectedYesSecond('');
    }
  };

  const renderScheduleItem = ({item}: any) => {
    const isOpen = expandedSched === item.id;
    return (
      <View>
        <View flexDirection={'row'} style={{marginVertical: hp('2%')}}>
          {/* <View flexDirection={'row'} style={{marginBottom: hp('8%')}}> */}
          <View flex={2}>
            <Text px={2} fontWeight={'bold'} numberOfLines={2} fontSize={12}>
              {`${moment.utc(item?.classDetails?.startsAt).format('LLL')}`}
            </Text>
            <Text px={2} fontWeight={'bold'} numberOfLines={2} fontSize={12}>
              {item && item.productDetails.name ? item.productDetails.name : ''}
            </Text>
            <Text px={2} fontWeight={'bold'} numberOfLines={2} fontSize={12}>
              {item.merchant &&
              item.merchant.companyName &&
              item.merchant.companyName
                ? item.merchant.companyName
                : ''}
            </Text>
            <Text px={2} flex={2} numberOfLines={2} fontSize={12}>
              {`Order Date: ${moment.utc(item.createdAt).format('LL')}`}
            </Text>

            {item?.isReviewed === false &&
            item?.checkedIn === true &&
            item?.status === 'completed' ? (
              <View flexDirection="row">
                <Image
                  alignSelf={'center'}
                  source={require('../../assets/images/categories/ic_review.png')}
                  size={'xs'}
                  mt="2"
                  ml="2"
                  height={6}
                  width={6}
                />
                <Pressable onPress={() => openModal(item)}>
                  <Text color="gray.500" mt="2" ml="2" fontWeight={'bold'}>
                    {'Add Review'}
                  </Text>
                </Pressable>
              </View>
            ) : (
              ''
            )}
          </View>
          {item.status === 'pending' && (
            <View flex={1}>
              <Button
                onPress={() => onCancel(item.id)}
                size="xs"
                variant={'outline'}
                justifyContent="center"
                padding={0}
                height={8}
                borderRadius={100}>
                Cancel
              </Button>
            </View>
          )}
          <View flexDirection="row">
            <Button
              variant="ghost"
              height={8}
              size="xs"
              rightIcon={<Entypo name="chevron-small-down" />}
              fontSize={10}
              color="gray.500"
              onPress={() => toggleExpandedSched(item.id)}>
              Details
            </Button>
          </View>
        </View>
        {isOpen && (
          <View width={'70%'} py={10}>
            <Divider />
            <View my={4}>
              <Text color="gray.500" fontWeight={'bold'}>
                {item.duration ? item.duration : ''}
              </Text>
              <Text color="gray.500">
                {`Start: ${moment.utc(item.startsAt).format('LL')}`}
              </Text>
              <Text color="gray.500">
                {`End: ${moment.utc(item?.endsAt).format('LL')}`}
              </Text>
              {item?.classDetails?.serviceType === 'Online' ? (
                <View flexDirection="row">
                  <Image
                    alignSelf={'center'}
                    source={require('../../assets/images/categories/meet.png')}
                    size={'xs'}
                    mt="2"
                    height={5}
                    width={5}
                  />
                  <Pressable
                    onPress={() =>
                      openGoogleMeetLink(item?.classDetails?.googleMeetLink)
                    }>
                    <Text color="gray.500" mt="2" ml="2" fontWeight={'bold'}>
                      {'Join meet now'}
                    </Text>
                  </Pressable>
                </View>
              ) : null}
              {/* onPress={openModal} */}
            </View>

            <Divider />
            <View my={2} flexDirection="row" justifyContent={'space-between'}>
              <Text color="gray.300" fontStyle={'italic'}>
                Total Amount
              </Text>
              <Text color="gray.500" fontWeight={'bold'}>
                {convertToCurrency(
                  item?.viaSubscription ? 0 : item?.pricingDetails?.price || 0,
                )}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ProfileContainer
      title="My Schedule"
      subtitle="These are the classes or appointments you booked.">
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}>
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={ProfileStyle.scrollContentContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <View style={ProfileStyle.modelBottomSheetContainer}>
              <View style={ProfileStyle.modelBottomSheetBgContainer}>
                <>
                  <Text
                    color="gray.500"
                    fontWeight={'bold'}
                    textAlign={'center'}
                    mt={6}
                    fontSize={18}>
                    {questions && questions[0]?.questionText}
                  </Text>
                  <View style={ProfileStyle.firstQuestionStyle}>
                    <Button
                      style={
                        isSelectedYes === ''
                          ? [
                              ProfileStyle.buttonStyle,
                              {backgroundColor: 'grey'},
                            ]
                          : ProfileStyle.buttonStyle
                      }
                      onPress={() => handleSubmit('yesEffective')}
                      borderRadius={20}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text style={{color: 'white'}}>yes</Text>
                      </View>
                    </Button>
                    <Button
                      style={
                        isSelectedNo === ''
                          ? [
                              ProfileStyle.buttonStyle,
                              {backgroundColor: 'grey'},
                            ]
                          : ProfileStyle.buttonStyle
                      }
                      onPress={() => handleSubmit('NoEffective')}
                      borderRadius={20}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text style={{color: 'white'}}>No</Text>
                      </View>
                    </Button>
                  </View>
                </>

                <View mb={1}>
                  <Text
                    color="gray.500"
                    fontWeight={'bold'}
                    textAlign={'center'}
                    mt={2}
                    fontSize={18}>
                    {questions && questions[1]?.questionText}
                  </Text>
                  <AirbnbRating
                    count={5}
                    reviews={['Poor', 'Poor', 'Good', 'Good', 'Excellent']}
                    defaultRating={1}
                    size={30}
                    onFinishRating={ratingCompleted}
                  />
                </View>
                <View mb={1}>
                  <Text
                    color="gray.500"
                    fontWeight={'bold'}
                    textAlign={'center'}
                    mt={2}
                    fontSize={18}>
                    {questions && questions[2]?.questionText}
                  </Text>
                  <AirbnbRating
                    count={5}
                    reviews={['Difficult', 'Difficult', 'Okay', 'Okay', 'Easy']}
                    defaultRating={1}
                    size={30}
                    onFinishRating={ratingCompletedendTime}
                  />
                </View>
                <>
                  <Text
                    color="gray.500"
                    fontWeight={'bold'}
                    textAlign={'center'}
                    style={{marginHorizontal: wp('5%')}}
                    mt={2}
                    fontSize={18}>
                    {questions && questions[3]?.questionText}
                  </Text>
                  <View style={ProfileStyle.firstQuestionStyle}>
                    <Button
                      style={
                        isSelectedYesSecond === ''
                          ? [
                              ProfileStyle.buttonStyle,
                              {backgroundColor: 'grey'},
                            ]
                          : ProfileStyle.buttonStyle
                      }
                      onPress={() => handleSubmit('endTimeYes')}
                      borderRadius={20}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white'}}>yes</Text>
                      </View>
                    </Button>
                    <Button
                      style={
                        isSelectedNoSecond === ''
                          ? [
                              ProfileStyle.buttonStyle,
                              {backgroundColor: 'grey'},
                            ]
                          : ProfileStyle.buttonStyle
                      }
                      onPress={() => handleSubmit('endTimeNo')}
                      borderRadius={20}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white'}}>No</Text>
                      </View>
                    </Button>
                  </View>
                </>
                <Text
                  color="gray.500"
                  fontWeight={'bold'}
                  textAlign={'center'}
                  style={{marginHorizontal: wp('5%')}}
                  mt={2}
                  fontSize={18}>
                  {questions && questions[4]?.questionText}
                </Text>
                <View style={{marginHorizontal: wp('6%')}}>
                  <Input
                    style={{marginHorizontal: wp('2%')}}
                    variant="underlined"
                    placeholder="Enter Comments"
                    autoCorrect={false}
                    fontSize={14}
                    onChangeText={(commentReview) =>
                      setCommentReview(commentReview)
                    }
                    value={commentReview}
                  />
                </View>
                <Button
                  style={{
                    marginHorizontal: wp('2%'),
                    marginVertical: hp('4%'),
                  }}
                  onPress={onPressSubmitReview}
                  borderRadius={20}>
                  Submit Review
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
      <Card>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={scheduleData}
          renderItem={renderScheduleItem}
          style={{height: hp('70%')}}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <EmptyListMessage message="You have not booked any classes or appointments yet." />
          }
          ItemSeparatorComponent={() => <Divider />}
        />
      </Card>
    </ProfileContainer>
  );
};

export default ProfileSchedules;
