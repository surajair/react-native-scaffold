import { call, take } from 'redux-saga/effects';
import analytics from '@react-native-firebase/analytics';
import { ScreenChangeAction } from '../Actions';

export function* startAnalytics() {
  while (true) {
    const {
      payload: { screen },
    } = yield take(ScreenChangeAction.toString());
    // const { logScreenView } = yield call(analytics);
    // yield call(logScreenView, {
    //   screen_name: screen,
    //   screen_class: screen,
    // });
  }
}
