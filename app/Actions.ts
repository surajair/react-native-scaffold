import { createAction } from '@reduxjs/toolkit';

/*
 * Purpose: To Store Global Actions which are not
 * part of any Slice Reducer
 */

export const ScreenChangeAction = createAction<{ screen: string; props?: any }>(
  'Global/ScreenChanged',
);
