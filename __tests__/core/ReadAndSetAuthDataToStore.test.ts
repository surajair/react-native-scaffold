import { expectSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_CURRENT_USER_ID } from '../../app/Constants';
import { Authentication } from '../../app/reducers/Authentication';
import { readAndSetAuthDataToStore } from '../../app/core/ReadAndSetAuthDataToStore';
import { TEST_LOGGED_IN_USER_ID } from '../../mocks/Constants';

describe('readAndSetAuthDataToStore', () => {
  afterEach(async (done) => {
    await AsyncStorage.removeItem(STORAGE_CURRENT_USER_ID);
    done();
  });

  describe('when current user is not present in async storage', () => {
    it('should set the null values to userId and authToken in store', async () => {
      const { storeState } = await expectSaga(readAndSetAuthDataToStore)
        .withReducer(Authentication.reducer)
        .put(
          Authentication.actions.readComplete({
            userId: null,
            failureReason: null,
          }),
        )
        .run();

      expect(storeState).toMatchObject({
        userId: null,
      });
    });
  });

  describe('when current user is present in async storage', () => {
    beforeEach(async (done) => {
      await AsyncStorage.setItem(
        STORAGE_CURRENT_USER_ID,
        TEST_LOGGED_IN_USER_ID,
      );
      done();
    });
    it('should set the correct values from async storage to userId and authToken in store', async () => {
      const { storeState } = await expectSaga(readAndSetAuthDataToStore)
        .withReducer(Authentication.reducer)
        .put(
          Authentication.actions.readComplete({
            userId: TEST_LOGGED_IN_USER_ID,
            failureReason: null,
          }),
        )
        .run();
      expect(storeState).toEqual({
        userId: TEST_LOGGED_IN_USER_ID,
        failureReason: null,
      });
    });
  });
});
