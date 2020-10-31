import { expectSaga } from 'redux-saga-test-plan';
import analytics from '@react-native-firebase/analytics';
import { startAnalytics } from '../../app/core/StartAnalytics';
import { ScreenChangeAction } from '../../app/Actions';

describe('initializeAnalytics', () => {
  xit('should call analytics().logScreenView with screen value', function () {
    return expectSaga(startAnalytics)
      .dispatch(ScreenChangeAction({ screen: 'login' }))
      .silentRun()
      .then(async () => {
        let { logScreenView } = await analytics();
        expect(logScreenView).toHaveBeenCalledWith({
          screen_name: 'login',
          screen_class: 'login',
        });
      });
  });
});
