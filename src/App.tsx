import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {Provider as ReduxProvider} from 'react-redux';
import Routes from './routes';
import {theme} from './theme/theme';
import store from './redux/store';

import {Settings} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CONFIG} from '@whenly/constants';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {API_URL, APP_URL, ENVIRONMENT, ONESIGNAL_APP_ID} from '@env';
import OneSignal from 'react-native-onesignal';

const App = () => {
  // Ask for consent first if necessary
  // Possibly only do this for iOS if no need to handle a GDPR-type flow
  Settings.initializeSDK();

  GoogleSignin.configure(GOOGLE_CONFIG);

  // OneSignal Initialization
  OneSignal.setAppId(ONESIGNAL_APP_ID);
  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  OneSignal.promptForPushNotificationsWithUserResponse();

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification);
  });

  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  console.log('ENVIRONMENT ===', ENVIRONMENT, API_URL, APP_URL);

  return (
    <NativeBaseProvider theme={theme} config={config}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <AlertNotificationRoot>
            <Routes />
          </AlertNotificationRoot>
        </NavigationContainer>
      </ReduxProvider>
    </NativeBaseProvider>
  );
};

export default App;
