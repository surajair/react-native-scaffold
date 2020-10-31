import { expectSaga, testSaga } from 'redux-saga-test-plan';
import {
  authenticate,
  onAuthenticateUser,
} from '../../../app/core/preLogin/OnAuthenticateUser';
import { Authentication } from '../../../app/reducers/Authentication';
import {
  TEST_ADMIN_EMAIL,
  TEST_ADMIN_FIRST_NAME,
  TEST_ADMIN_LAST_NAME,
  TEST_ADMIN_PASSWORD,
  TEST_CARRIER_CYCLE_TIMEZONE,
  TEST_CARRIER_NAME,
  TEST_LOGGED_IN_USER_ID,
} from '../../../mocks/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
  STORAGE_CARRIER_PROFILE,
  STORAGE_CURRENT_USER_ID,
  STORAGE_USER_PROFILE,
} from '../../../app/Constants';
import { CarrierProfile } from '../../../app/reducers/CarrierProfile';
import { UserProfile } from '../../../app/reducers/UserProfile';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

const authFields = {
  email: TEST_ADMIN_EMAIL,
  password: TEST_ADMIN_PASSWORD,
};

describe('onAuthenticateUser', () => {
  it('should run', function () {
    testSaga(onAuthenticateUser)
      .next()
      .take(Authentication.actions.authenticate.toString())
      .next(Authentication.actions.authenticate(authFields))
      .call(authenticate, authFields)
      .next()
      .finish()
      .isDone();
  });
});

describe('authenticate() when incorrect login details are passed', () => {
  it('should dispatch loginFailed action and set the reason in store', async () => {
    server.use(
      rest.post(/\/login\/web\//, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            result: 'fail',
            error: { reason: 'Invalid User/Password!' },
          }),
        );
      }),
    );
    const { storeState } = await expectSaga(authenticate, authFields)
      .withReducer(Authentication.reducer)
      .put(
        Authentication.actions.loginFailed({
          reason: 'Invalid User/Password!',
        }),
      )
      .run();
    expect(storeState.failureReason).toBe('Invalid User/Password!');
  });
});

describe('authenticate() when correct login details are passed', () => {
  afterEach(() => {
    return Promise.all([
      AsyncStorage.removeItem(STORAGE_CURRENT_USER_ID),
      AsyncStorage.removeItem(STORAGE_USER_PROFILE),
      AsyncStorage.removeItem(STORAGE_CARRIER_PROFILE),
    ]);
  });

  it('should dispatch loginStart action', function () {
    return expectSaga(authenticate, authFields)
      .withReducer(Authentication.reducer)
      .put(Authentication.actions.loginStart({}))
      .run();
  });

  it('should dispatch loginSuccess action', function () {
    return expectSaga(authenticate, authFields)
      .withReducer(Authentication.reducer)
      .put(
        Authentication.actions.loginSuccess({
          userId: TEST_LOGGED_IN_USER_ID,
        }),
      )
      .run();
  });

  it('should save the user id in store and local storage ', async () => {
    const { storeState } = await expectSaga(authenticate, authFields)
      .withReducer(Authentication.reducer)
      .run();
    expect(storeState.userId).toBe(TEST_LOGGED_IN_USER_ID);
    expect(await AsyncStorage.getItem(STORAGE_CURRENT_USER_ID)).toBe(
      TEST_LOGGED_IN_USER_ID,
    );
  });

  it('should set the user profile in store and local storage ', async () => {
    let profile = {
      firstName: TEST_ADMIN_FIRST_NAME,
      lastName: TEST_ADMIN_LAST_NAME,
    };
    const { storeState } = await expectSaga(authenticate, authFields)
      .put(UserProfile.actions.setUserProfile(profile))
      .withReducer(UserProfile.reducer)
      .run();
    expect(storeState).toMatchObject(profile);
    expect(await AsyncStorage.getItem(STORAGE_USER_PROFILE)).toBe(
      JSON.stringify(profile),
    );
  });

  it('should set the carrier profile in store and local storage ', async () => {
    const profile = {
      carrierName: TEST_CARRIER_NAME,
      cycleTimezone: TEST_CARRIER_CYCLE_TIMEZONE,
    };
    const { storeState } = await expectSaga(authenticate, authFields)
      .put(CarrierProfile.actions.setCarrierProfile(profile))
      .withReducer(CarrierProfile.reducer)
      .run();
    expect(storeState).toMatchObject(profile);
    expect(await AsyncStorage.getItem(STORAGE_CARRIER_PROFILE)).toBe(
      JSON.stringify(profile),
    );
  });
});
