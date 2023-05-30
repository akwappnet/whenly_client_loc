import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Height = Dimensions.get('window').height;
const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modelBottomSheetContainer: {
    // position: 'absolute',
    marginTop: hp('15%'),
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginHorizontal: 0,
    // height: hp('85%'),
    // bottom: 0,
  },
  modelBottomSheetBgContainer: {
    // marginTop: hp('15%'),
    width: wp('100%'),
    // flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    // height: hp('100%'),
    // bottom: 0,
  },
  firstQuestionStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: hp('2%'),
    marginHorizontal: wp('2%'),
  },
  buttonStyle: {
    marginHorizontal: wp('2%'),
    width: wp('30%'),
  },
  scrollContentContainer: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export {ProfileStyle};
