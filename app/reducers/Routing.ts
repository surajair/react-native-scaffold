import { createSlice, Slice } from '@reduxjs/toolkit';

export const Routing: Slice = createSlice({
  name: 'Routing',
  initialState: {
    router: null,
  },
  reducers: {
    gotoScreen: (state, _action: any) => state,
    setRouter: (state: { router: null | any }, { payload }) => ({
      ...state,
      ...{ router: payload.router },
    }),
  },
});
