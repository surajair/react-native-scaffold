import { createSlice, Slice } from '@reduxjs/toolkit';

export const CarrierProfile: Slice = createSlice({
  name: 'CarrierProfile',
  initialState: {
    carrierName: null,
    cycleTimezone: null,
  },
  reducers: {
    setCarrierProfile: (
      state,
      { payload: { carrierName, cycleTimezone } },
    ) => ({
      ...state,
      ...{ carrierName, cycleTimezone },
    }),
  },
});
