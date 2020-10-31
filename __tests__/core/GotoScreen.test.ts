import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { gotoScreen, onGotoScreen } from '../../app/core/GotoScreen';
import { Routing } from '../../app/reducers/Routing';
import { navigate } from '../../app/RootNavigation';

describe('gotoScreen', () => {
  it('should call navigationRef.navigate function', function () {
    return expectSaga(gotoScreen, 'HomeScreen', {})
      .run()
      .then(() => {
        expect(navigate).toHaveBeenCalledWith('HomeScreen', {});
      });
  });
});

describe('onGotoScreen', () => {
  it('should run', function () {
    testSaga(onGotoScreen)
      .next()
      .take(Routing.actions.gotoScreen.toString())
      .next(Routing.actions.gotoScreen({ screen: 'Login', props: {} }))
      .call(gotoScreen, 'Login', {})
      .next()
      .take(Routing.actions.gotoScreen.toString())
      .next(
        Routing.actions.gotoScreen({
          screen: 'HomeScreen',
          props: {},
        }),
      )
      .call(gotoScreen, 'HomeScreen', {})
      .finish()
      .isDone();
  });
});
