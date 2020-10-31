import { Task } from 'redux-saga';
import { cancel, fork, spawn, take } from 'redux-saga/effects';
import { onScreenChangeActionPreLogin } from './OnScreenChangeActionPreLogin';
import { Authentication } from '../../reducers/Authentication';
import { postLoginSaga } from '../postLogin/PostLoginSaga';

export function* preLoginSaga(): any {
  const stateChangeTask: Task = yield fork(onScreenChangeActionPreLogin);
  yield take(Authentication.actions.loginSuccess.toString());
  yield cancel(stateChangeTask);
  yield spawn(postLoginSaga);
}
