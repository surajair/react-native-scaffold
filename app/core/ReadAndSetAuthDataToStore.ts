import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_AUTH_TOKEN, STORAGE_CURRENT_USER_ID } from '../Constants';
import { Authentication } from '../reducers/Authentication';

export function* readAndSetAuthDataToStore() {
  const userId = yield call(AsyncStorage.getItem, STORAGE_CURRENT_USER_ID);
  const authToken = yield call(AsyncStorage.getItem, STORAGE_AUTH_TOKEN);
  yield put(
    Authentication.actions.readComplete({
      userId,
      authToken,
      failureReason: null,
    }),
  );
}
