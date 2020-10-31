import { createSlice, Slice } from '@reduxjs/toolkit';

export const UserProfile: Slice = createSlice({
  name: 'UserProfile',
  initialState: {
    firstName: null,
    lastName: null,
  },
  reducers: {
    setUserProfile: (state, { payload: { firstName, lastName } }) => ({
      ...state,
      ...{ firstName, lastName },
    }),
  },
});
