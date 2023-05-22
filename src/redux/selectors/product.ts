import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';

export const selectProductState = (state: RootState) => state.product;
export const selectPlanState = (state: RootState) => state.plan;
export const selectClassState = (state: RootState) => state.class;

export const selectPlans = createSelector(
  selectPlanState,
  (plans) => plans.docs,
);

export const selectBookings = createSelector(
  selectProductState,
  (product) => product.bookings,
);

export const selectSubscriptions = createSelector(
  selectProductState,
  (product) => product.subscriptions,
);

export const selectSubscriptionTags = createSelector(
  selectSubscriptions,
  (subs) =>
    subs.map((sub) => ({
      id: sub.id,
      tags: sub.tags,
      // tags: sub.tags.toLowerCase().split(','),
      sessions: sub.sessions,
      status: sub.status,
      count: 0,
    })),
);
