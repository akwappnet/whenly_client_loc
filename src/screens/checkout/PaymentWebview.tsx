import HeaderBar from '@whenly/components/HeaderBar';
import {CLASSES, PLAN} from '@whenly/constants';
import {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

import {
  useAppDispatch,
  planActions,
  selectProductState,
  selectPlanState,
  productActions,
  classActions,
} from '@whenly/redux';
import {useSelector} from 'react-redux';
import FullpageLoading from '@whenly/components/FullpageLoading';

const PaymentWebvew = (props) => {
  const {navigation, route} = props;
  const [finished, setFinished] = useState(false);
  const {loading} = useSelector(selectProductState);
  const {loading: loadingPlan} = useSelector(selectPlanState);

  const appDispatch = useAppDispatch();

  const extractFromURL = (str: string) => {
    var result = '';

    const s = str.split('&');
    var i = 0;
    for (i = 0; i < s.length; i++) {
      const value = s[i].split('=');
      if (value[0] == 'digest') {
        // match
        result = value[1];
        break;
      }
    }
    return result;
  };

  const handleSubscription = useCallback(
    async (referenceNo: string) => {
      if (finished) {
        const response = await appDispatch(
          planActions.subscribeToPlan(referenceNo),
        );
        if (response.type.includes('fulfilled')) {
          appDispatch(productActions.invoice(response.payload.invoiceId));
          appDispatch(productActions.subscriptions());
          navigation.push('Success', {type: PLAN});
        }
      }
    },
    [finished],
  );
  const handleBooking = useCallback(
    async (referenceNo: string) => {
      if (finished) {
        const response = await appDispatch(classActions.book(referenceNo));

        if (response.type.includes('fulfilled')) {
          appDispatch(productActions.invoice(response.payload.invoiceId));
          appDispatch(productActions.bookings());
          navigation.push('Success', {type: CLASSES});
        }
      }
    },
    [finished],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <FullpageLoading visible={loading || loadingPlan} />
      <HeaderBar onBack={() => navigation.goBack()} title="" />
      <WebView
        source={{uri: route.params?.url}}
        onNavigationStateChange={(navState) => {
          console.log(navState);
          if (navState.url.includes('https://staging.app.whenly.ph')) {
            setFinished(true); // to prevent calling twice
            const referenceNo = extractFromURL(navState.url);
            if (route.params.type === PLAN) {
              handleSubscription(referenceNo);
            } else {
              handleBooking(referenceNo);
            }
          }
        }}
      />
    </SafeAreaView>
  );
};

export default PaymentWebvew;
