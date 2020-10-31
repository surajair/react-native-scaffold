import { call, put, take } from 'redux-saga/effects';
import { Authentication } from '../../reducers/Authentication';
import { Api } from '../../api/Api';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_CURRENT_USER_ID } from '../../Constants';

export function* onAuthenticateUser() {
  while (true) {
    const {
      payload: { email, password },
    } = yield take(Authentication.actions.authenticate.toString());
    yield call(authenticate, { email, password });
  }
}

export function* authenticate({ email, password }: any) {
  yield put(Authentication.actions.loginStart({}));
  try {
    const { userId } = yield call(Api.post, '/login/web/', { email, password });
    yield call(AsyncStorage.setItem, STORAGE_CURRENT_USER_ID, userId);
    yield put(Authentication.actions.loginSuccess({ userId }));
  } catch (err) {
    yield put(
      Authentication.actions.loginFailed({ reason: 'Invalid User/Password!' }),
    );
  }
}
