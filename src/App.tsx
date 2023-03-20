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

const App = () => {
  // Ask for consent first if necessary
  // Possibly only do this for iOS if no need to handle a GDPR-type flow
  Settings.initializeSDK();

  GoogleSignin.configure(GOOGLE_CONFIG);

  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

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
