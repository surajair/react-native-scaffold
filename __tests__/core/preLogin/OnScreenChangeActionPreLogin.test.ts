import { Task } from '@redux-saga/types';
import { createMockTask } from '@redux-saga/testing-utils';
import { testSaga } from 'redux-saga-test-plan';
import { onScreenChangeActionPreLogin } from '../../../app/core/preLogin/OnScreenChangeActionPreLogin';
import { ScreenChangeAction } from '../../../app/Actions';
import { onLoginScreen } from '../../../app/screens/OnLoginScreen';
import { onForgotPasswordScreen } from '../../../app/screens/OnForgotPasswordScreen';
import { authenticate } from '../../../app/core/preLogin/OnAuthenticateUser';

describe('onStateChangeActionPreLogin', () => {
  const loginScreenTask: Task = createMockTask();
  it('should run', function () {
    testSaga(onScreenChangeActionPreLogin)
      .next()
      .take(ScreenChangeAction.toString())
      .save('state change')
      .next(ScreenChangeAction({ screen: 'Login', props: {} }))
      .fork(onLoginScreen)
      .next(loginScreenTask)
      .take(ScreenChangeAction.toString())
      .next(ScreenChangeAction({ screen: 'ForgotPassword', props: {} }))
      .cancel(loginScreenTask)
      .next()
      .fork(onForgotPasswordScreen)
      .next(authenticate)
      .finish()
      .isDone()

      .restore('state change')
      .next(ScreenChangeAction({ screen: 'ForgotPin', props: {} }))
      .take(ScreenChangeAction.toString())
      .next(ScreenChangeAction({ screen: 'Home', props: {} }))
      .finish()
      .isDone();
  });
});
