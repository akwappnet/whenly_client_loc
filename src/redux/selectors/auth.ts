import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectAuthState = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user,
);

export const selectFavorites = createSelector(
  selectAuthState,
  (state) => state.user?.favorites || [],
);
