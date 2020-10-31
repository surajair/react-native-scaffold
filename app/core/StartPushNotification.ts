import { call } from 'redux-saga/effects';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';

export function* startPushNotification() {
  if (Config.ENV !== 'production') {
    return false;
  }
  yield call(OneSignal.init, Config.ONESIGNAL_APP_ID);
}
