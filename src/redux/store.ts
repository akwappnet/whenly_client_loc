import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import planSlice from './slices/planSlice';
import merchantSlice from './slices/merchantSlice';
import classSlice from './slices/classSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  plan: planSlice,
  merchant: merchantSlice,
  class: classSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
