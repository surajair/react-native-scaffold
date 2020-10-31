import { createSlice, Slice } from '@reduxjs/toolkit';

export type AuthenticationState = {
  userId: null | string;
  authToken: null | string;
  failureReason: null | string;
};
export const Authentication: Slice = createSlice({
  name: 'Authentication',
  initialState: {
    userId: null,
    authToken: null,
    failureReason: null,
  },
  reducers: {
    loginFailed: (state, { payload: { reason } }) => ({
      ...state,
      ...{ failureReason: reason },
    }),
    loginSuccess: (state, { payload: { userId } }) => ({
      ...state,
      ...{ userId },
    }),
    logoutSuccess: (state) => ({
      ...state,
      ...{ userId: null },
    }),
    loginStart: (state) => ({
      ...state,
      ...{ failureReason: null },
    }),
    readComplete(
      state: AuthenticationState,
      { payload: { userId, authToken, failureReason } },
    ) {
      return {
        ...state,
        ...{ userId, authToken, failureReason },
      };
    },
    authenticate: (state) => state,
  },
});
