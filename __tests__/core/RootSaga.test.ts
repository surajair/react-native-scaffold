import { testSaga } from 'redux-saga-test-plan';
import { startSentry } from '../../app/core/StartSentry';
import { startPushNotification } from '../../app/core/StartPushNotification';
import { startAnalytics } from '../../app/core/StartAnalytics';
import { MIGRATIONS } from '../../app/database/MIGRATIONS';
import { runMigration } from '../../app/core/RunMigration';
import { readAndSetAuthDataToStore } from '../../app/core/ReadAndSetAuthDataToStore';
import { rootSaga } from '../../app/core/RootSaga';
import { isUserLoggedIn } from '../../app/core/IsUserLoggedIn';
import { preLoginSaga } from '../../app/core/preLogin/PreLoginSaga';
import { postLoginSaga } from '../../app/core/postLogin/PostLoginSaga';
import { onGotoScreen } from '../../app/core/GotoScreen';

describe('RootSaga Test', () => {
  it('should run', () => {
    testSaga(rootSaga)
      .next()
      .spawn(startSentry)
      .next()
      .spawn(startPushNotification)
      .next()
      .spawn(startAnalytics)
      .next()
      .call(runMigration, MIGRATIONS)
      .next()
      .call(readAndSetAuthDataToStore)
      .next()
      .spawn(onGotoScreen)
      .next()
      .call(isUserLoggedIn)
      .save('login status')
      .next(true)
      .spawn(postLoginSaga)
      .next()
      .isDone()

      .restore('login status')
      .next(false)
      .spawn(preLoginSaga)
      .next()
      .isDone();
  });
});
