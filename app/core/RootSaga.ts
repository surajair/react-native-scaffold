import { call, spawn } from 'redux-saga/effects';
import { startSentry } from './StartSentry';
import { startPushNotification } from './StartPushNotification';
import { startAnalytics } from './StartAnalytics';
import { runMigration } from './RunMigration';
import { MIGRATIONS } from '../database/MIGRATIONS';
import { readAndSetAuthDataToStore } from './ReadAndSetAuthDataToStore';
import { isUserLoggedIn } from './IsUserLoggedIn';
import { preLoginSaga } from './preLogin/PreLoginSaga';
import { postLoginSaga } from './postLogin/PostLoginSaga';
import { onGotoScreen } from './GotoScreen';

export function* rootSaga() {
  yield spawn(startSentry);
  yield spawn(startPushNotification);
  yield spawn(startAnalytics);

  yield call(runMigration, MIGRATIONS);

  yield call(readAndSetAuthDataToStore);

  yield spawn(onGotoScreen);

  if (yield call(isUserLoggedIn)) {
    yield spawn(postLoginSaga);
  } else {
    yield spawn(preLoginSaga);
  }
}
