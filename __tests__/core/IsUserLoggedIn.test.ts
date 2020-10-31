import { expectSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_CURRENT_USER_ID } from '../../app/Constants';
import { isUserLoggedIn } from '../../app/core/IsUserLoggedIn';
import { TEST_LOGGED_IN_USER_ID } from '../../mocks/Constants';

describe('isUserLoggedIn', () => {
  afterEach(() => {
    return AsyncStorage.removeItem(STORAGE_CURRENT_USER_ID);
  });

  describe('when userId is NOT present in async storage', () => {
    it('should return false when userId and auth token are NOT present in async storage', function () {
      return expectSaga(isUserLoggedIn).returns(false).run();
    });
  });

  describe('when userId is present in async storage', () => {
    beforeEach(() => {
      return AsyncStorage.setItem(
        STORAGE_CURRENT_USER_ID,
        TEST_LOGGED_IN_USER_ID,
      );
    });

    it('should return true when userId and auth token are present in async storage', async () => {
      return expectSaga(isUserLoggedIn).returns(true).run();
    });
  });
});
