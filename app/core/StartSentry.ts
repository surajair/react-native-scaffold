import { call } from 'redux-saga/effects';
import Sentry from '@sentry/react-native';
import Config from 'react-native-config';

export function* startSentry() {
  if (Config.ENV !== 'production') {
    return false;
  }
  // @ts-ignore
  yield call(Sentry.init, { dns: Config.SENTRY_DSN });
}
