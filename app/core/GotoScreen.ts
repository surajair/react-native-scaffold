import { call, take } from 'redux-saga/effects';
import { Routing } from '../reducers/Routing';
import { navigate } from '../RootNavigation';

export function* gotoScreen(screen: string, props: any = {}) {
  navigate(screen, props);
}

export function* onGotoScreen() {
  while (true) {
    const {
      payload: { screen, props },
    } = yield take(Routing.actions.gotoScreen.toString());
    yield call(gotoScreen, screen, props);
  }
}
