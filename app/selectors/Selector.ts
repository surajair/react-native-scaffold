import { createSelector } from 'reselect';
import { RootStateOrAny } from 'react-redux';
import { isNull } from 'lodash';

export const isUserLoggedIn = createSelector(
  (state: RootStateOrAny) => state.Authentication.userId,
  (userId: null | string) => !isNull(userId),
);
