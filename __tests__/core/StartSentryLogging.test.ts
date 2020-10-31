import { expectSaga } from 'redux-saga-test-plan';
import Sentry from '@sentry/react-native';
import { SENTRY_DSN } from 'react-native-dotenv';
import { call } from 'redux-saga/effects';

jest.mock('react-native-dotenv');

export function* startSentryLogging() {
  const { ENV } = require('react-native-dotenv');
  if (ENV !== 'production') {
    return false;
  }
  // @ts-ignore
  yield call(Sentry.init, { dns: SENTRY_DSN });
}

describe('startSentryLogging', () => {
  afterEach(() => {
    require('react-native-dotenv').ENV = '';
    // @ts-ignore
    jest.clearAllMocks();
  });

  describe('when ENV is production', () => {
    beforeEach(() => {
      require('react-native-dotenv').ENV = 'production';
    });
    it('should call Sentry.init', function () {
      return expectSaga(startSentryLogging)
        .call(Sentry.init, { dns: SENTRY_DSN })
        .run();
    });
  });

  describe('when ENV is not production', () => {
    beforeEach(() => {
      require('react-native-dotenv').ENV = 'development';
    });
    it('should not call Sentry.init', function () {
      return expectSaga(startSentryLogging)
        .run()
        .then(() => {
          expect(Sentry.init).not.toHaveBeenCalled();
        });
    });
  });
});
