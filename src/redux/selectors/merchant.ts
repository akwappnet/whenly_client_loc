import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';

export const selectMerchantState = (state: RootState) => state.merchant;
