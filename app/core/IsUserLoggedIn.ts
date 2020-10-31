import { call } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_CURRENT_USER_ID } from '../Constants';
import { isEmpty } from 'lodash';

export function* isUserLoggedIn() {
  const userId: string | null = yield call(
    AsyncStorage.getItem,
    STORAGE_CURRENT_USER_ID,
  );

  return !isEmpty(userId);
}
