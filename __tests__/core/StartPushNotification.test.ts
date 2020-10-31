import { expectSaga } from 'redux-saga-test-plan';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import { startPushNotification } from '../../app/core/StartPushNotification';

describe('initializePushNotification', () => {
  afterEach(() => {
    OneSignal.init.mockClear();
  });

  it('should call OneSignal.init', function () {
    Config.ENV = 'production';
    return expectSaga(startPushNotification)
      .run()
      .then(() => {
        expect(OneSignal.init).toHaveBeenCalledWith(Config.ONESIGNAL_APP_ID);
      });
  });

  it('should not call init is ENV is not production', function () {
    Config.ENV = 'development';
    return expectSaga(startPushNotification)
      .run()
      .then(() => {
        expect(OneSignal.init).not.toHaveBeenCalled();
      });
  });
});
