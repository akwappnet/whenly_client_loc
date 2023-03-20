import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export const successToast = (title: string, textBody: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: title,
    textBody: textBody,
  });
};

export const errorToast = (title: string, textBody: string) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: title,
    textBody: textBody,
  });
};
