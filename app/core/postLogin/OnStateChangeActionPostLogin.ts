import { Task } from 'redux-saga';
import { cancel, take } from 'redux-saga/effects';
import { ScreenChangeAction } from '../../Actions';
import { isNull } from 'lodash';

export function* onStateChangeActionPostLogin() {
  let screenTask: Task | null = null;

  while (true) {
    const { payload } = yield take(ScreenChangeAction.toString());
    const { screen } = payload;
    if (!isNull(screenTask)) {
      yield cancel(screenTask);
    }
    switch (screen) {
      case 'Home':
        break;
      case 'Map':
        break;
      default:
        break;
    }
  }
}
