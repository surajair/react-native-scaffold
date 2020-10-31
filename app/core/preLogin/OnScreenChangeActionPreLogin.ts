import { Task } from '@redux-saga/types';
import { cancel, fork, take } from 'redux-saga/effects';
import { ScreenChangeAction } from '../../Actions';
import { isNull } from 'lodash';
import { onLoginScreen } from '../../screens/OnLoginScreen';
import { onForgotPasswordScreen } from '../../screens/OnForgotPasswordScreen';

export function* onScreenChangeActionPreLogin() {
  let screenTask: Task | null = null;

  while (true) {
    const { payload } = yield take(ScreenChangeAction.toString());
    const { screen } = payload;
    if (!isNull(screenTask)) {
      yield cancel(screenTask);
    }
    switch (screen) {
      case 'Login':
        screenTask = yield fork(onLoginScreen);
        break;
      case 'ForgotPassword':
        screenTask = yield fork(onForgotPasswordScreen);
        break;
      default:
        break;
    }
  }
}
