import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import HeaderBar from '@whenly/components/HeaderBar';
import {CLASSES, PLAN} from '@whenly/constants';
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
import LoadingIndicator from '@whenly/components/LoadingIndicator';
import {APP_URL, ENVIRONMENT} from '@env';
import {Flex} from 'native-base';
import queryString from 'querystring';
import {v4 as UuidV4} from 'uuid';

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
    async (referenceNo: string, status: string) => {
      if (finished) {
        console.log('Status', status);
        // Pending , Success
        if (['P', 'S'].includes(status)) {
          const response = await appDispatch(
            planActions.subscribeToPlan({
              referenceNo,
              txnId: route.params?.txnId,
              status,
            }),
          );
          if (response.type.includes('fulfilled')) {
            appDispatch(productActions.subscriptions());
            navigation.replace('Success', {type: PLAN});
          }
        }
      }
    },
    [finished],
  );
  const handleBooking = useCallback(
    async (
      referenceNo: string,
      status: string,
      subscription?: string = null,
    ) => {
      if (finished) {
        console.log('Status', status);
        const payload = {
          referenceNo,
          txnId: route.params?.txnId,
          status,
          subscription,
        };
        console.log('handleBooking', payload);
        // Pending , Success
        if (['P', 'S'].includes(status)) {
          const response = await appDispatch(classActions.book(payload));

          if (response.type.includes('fulfilled')) {
            appDispatch(productActions.bookings());
            navigation.replace('Success', {type: CLASSES});
          }
        }
      }
    },
    [finished],
  );

  useEffect(() => {
    const {subscription, type} = route.params;
    console.log(
      'subscription && subscription.sessions && subscription.sessions > 0',
      subscription && subscription.sessions && subscription.sessions > 0,
    );
    console.log(
      'subscription?.sessions === -1 && type === CLASSES',
      subscription?.sessions === -1 && type === CLASSES,
    );
    if (
      subscription &&
      ((subscription && subscription?.sessions > 0) ||
        (subscription?.sessions === -1 && type === CLASSES))
    ) {
      console.log('Subscription test', subscription);
      setFinished(true);
      handleBooking(UuidV4(), 'S', subscription.id);
    }
  }, [handleBooking, route.params]);

  console.log('route.params?.url', route.params?.url);

  return (
    <Flex flex={1} bg="white" safeArea>
      <LoadingIndicator visible={loading || loadingPlan} />
      <HeaderBar onBack={() => navigation.goBack()} title="" />
      <WebView
        source={{uri: route.params?.url}}
        onNavigationStateChange={(navState) => {
          console.log('navState', navState);
          // FOR TESTING PURPOSES
          if (navState.url.startsWith('https://staging.app.whenly.ph')) {
            // if (navState.url.startsWith(APP_URL)) {
            setFinished(true); // to prevent calling twice
            const params = queryString.parse(navState.url);
            // console.log('QS', params);
            const referenceNo = extractFromURL(navState.url);
            if (route.params.type === PLAN) {
              handleSubscription(params?.refno, params?.status);
            } else {
              handleBooking(params?.refno, params?.status);
            }
          }
        }}
      />
    </Flex>
  );
};

export default PaymentWebvew;
