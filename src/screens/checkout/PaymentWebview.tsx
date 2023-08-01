import React, {useCallback, useEffect, useState} from 'react';
import HeaderBar from '@whenly/components/HeaderBar';
import {CLASSES, PLAN} from '@whenly/constants';
import {WebView} from 'react-native-webview';

import {
  useAppDispatch,
  selectProductState,
  selectPlanState,
  productActions,
  classActions,
} from '@whenly/redux';
import {useSelector} from 'react-redux';
import LoadingIndicator from '@whenly/components/LoadingIndicator';
import {APP_URL} from '@env';
import {Flex} from 'native-base';
import queryString from 'querystring';
import {v4 as UuidV4} from 'uuid';

const dragonPayStatuses = ['P', 'S'];
const xenditStatuses = ['PENDING', 'PAID']; // PENDING,PAID,EXPIRED

const PaymentWebview = (props) => {
  const {navigation, route} = props;
  const [finished, setFinished] = useState(false);
  const {loading} = useSelector(selectProductState);
  const {loading: loadingPlan} = useSelector(selectPlanState);
  const [loadingWeb, setLoadingWeb] = useState(false);
  const {
    txnId,
    metadata,
    url: checkoutURL,
    type: checkoutType,
  } = route?.params || {};

  const appDispatch = useAppDispatch();

  const handleSubscription = useCallback(
    async (referenceNo: string, status: string) => {
      if (finished) {
        if ([...dragonPayStatuses, ...xenditStatuses].includes(status)) {
          appDispatch(productActions.subscriptions());
          setTimeout(() => {
            navigation.replace('Success', {type: PLAN});
          }, 200);
        } else {
          navigation.goBack();
        }
      }
    },
    [appDispatch, finished, navigation],
  );

  const handleBooking = useCallback(
    async (referenceNo: string, status: string, subscription?: string) => {
      if (finished) {
        const payload = {
          referenceNo,
          txnId: txnId,
          status,
          subscription,
        };
        if (['paid'].includes(status)) {
          const response = await appDispatch(classActions.book(payload));
          if (response.type.includes('fulfilled')) {
            appDispatch(productActions.bookings());
            setTimeout(() => {
              navigation.replace('Success', {type: CLASSES});
            }, 200);
          }
        } else {
          appDispatch(productActions.bookings());
          setTimeout(() => {
            navigation.replace('Success', {type: CLASSES});
          }, 200);
          // navigation.goBack();
        }
      }
    },
    [appDispatch, finished, navigation, txnId],
  );

  useEffect(() => {
    const {subscription, type} = route.params;
    // check subscription if still have free sessions
    if (
      subscription &&
      ((subscription && subscription?.sessions > 0) ||
        (subscription?.sessions === -1 && type === CLASSES))
    ) {
      setFinished(true);
      handleBooking(UuidV4(), 'paid', subscription.id);
    }
  }, [handleBooking, route.params]);

  return (
    <Flex flex={1} bg="white" safeArea>
      <LoadingIndicator visible={loading || loadingPlan} />
      <HeaderBar
        onBack={() => {
          if (!loading && !loadingPlan && !loadingWeb) {
            navigation.goBack();
          }
        }}
        title=""
      />
      <WebView
        source={{uri: checkoutURL}}
        onNavigationStateChange={(navState) => {
          setLoadingWeb(navState.loading);
          // FOR TESTING PURPOSES
          const isTester = 'https://staging.app.whenly.ph'; // dragon pay is set to redirect on staging
          if (
            navState.url.startsWith(APP_URL) ||
            navState.url.startsWith(isTester)
          ) {
            // if (navState.url.startsWith(APP_URL)) {
            setFinished(true); // to prevent calling twice

            const params = queryString.parse(navState.url);
            if (params?.refno) {
              // Redirect from dragonpay
              // console.log('redirect from dragonpay');
              if (checkoutType === PLAN) {
                handleSubscription(params?.refno, params?.status);
              } else {
                handleBooking(params?.refno, params?.status);
              }
            } else {
              // Redirect from xendit
              // console.log('redirect from xendit');
              if (checkoutType === PLAN) {
                handleSubscription(metadata.id, metadata.status);
              } else {
                handleBooking(metadata.id, metadata.status);
              }
            }
          }
        }}
      />
    </Flex>
  );
};

export default PaymentWebview;
