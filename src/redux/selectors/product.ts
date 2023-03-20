import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';

export const selectProductState = (state: RootState) => state.product;
export const selectPlanState = (state: RootState) => state.plan;
export const selectClassState = (state: RootState) => state.class;

export const selectPlans = createSelector(
  selectPlanState,
  (plans) => plans.docs,
);
