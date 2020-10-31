import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from '@redux-saga/testing-utils';
import { Authentication } from '../../../app/reducers/Authentication';
import { onScreenChangeActionPreLogin } from '../../../app/core/preLogin/OnScreenChangeActionPreLogin';
import { preLoginSaga } from '../../../app/core/preLogin/PreLoginSaga';
import { postLoginSaga } from '../../../app/core/postLogin/PostLoginSaga';

describe('preLoginSaga', function () {
  it('should run', function () {
    const stateChangeTask = createMockTask();
    testSaga(preLoginSaga)
      .next()
      .fork(onScreenChangeActionPreLogin)
      .next(stateChangeTask)
      .take(Authentication.actions.loginSuccess.toString())
      .next()
      .cancel(stateChangeTask)
      .next()
      .spawn(postLoginSaga)
      .next()
      .isDone();
  });
});
