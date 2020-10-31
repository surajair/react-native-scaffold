import { fork } from 'redux-saga/effects';
import { onAuthenticateUser } from '../core/preLogin/OnAuthenticateUser';

export function* onLoginScreen() {
  yield fork(onAuthenticateUser);
}
