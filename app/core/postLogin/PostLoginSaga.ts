import { Task } from 'redux-saga';
import { cancel, fork, spawn, take } from 'redux-saga/effects';
import { Authentication } from '../../reducers/Authentication';
import { preLoginSaga } from '../preLogin/PreLoginSaga';
import { onStateChangeActionPostLogin } from './OnStateChangeActionPostLogin';

export function* postLoginSaga(): any {
  const stateChangeTask: Task = yield fork(onStateChangeActionPostLogin);
  yield take(Authentication.actions.logoutSuccess.toString());
  yield cancel(stateChangeTask);
  yield spawn(preLoginSaga);
}
