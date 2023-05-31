import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {MERCHANT} from '@whenly/constants';
import {joinWithSlash} from '@whenly/utils/string';
import {getMerchant, getMerchants} from '@whenly/services';

interface MerchantAddress {
  address: string;
  lat: number;
  long: number;
  default?: boolean;
}
export interface Merchant {
  address: MerchantAddress[];
  companyName: string;
  companyNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  providers: string[];
  status: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  companyDescription: string;
  companySocial: {
    [key: string]: string;
  };
  profilePicture: string;
  visible: boolean;
  _id: string;
  id?: string;
}

interface MerchantState {
  loading: boolean;
  loadingMerchant: boolean;
  error: string;
  merchant: Merchant | null;
  docs: Merchant[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  offset: number;
  prevPage: number | null;
  nextPage: number | null;
}

const initialState: MerchantState = {
  loading: false,
  loadingMerchant: false,
  error: '',
  merchant: null,
  docs: [],
  totalDocs: 0,
  limit: 0,
  page: 0,
  totalPages: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  offset: 0,
  prevPage: null,
  nextPage: null,
};

const merchants = createAsyncThunk(
  joinWithSlash(MERCHANT, 'merchants'),
  async (payload: any, {rejectWithValue}) => {
    try {
      console.log('merchants payload', payload);
      const response = await getMerchants(payload);
      console.log('FETCHING MERCHANTS', response);
      return response?.data;
    } catch (error) {
      console.log('Error fetching merchants', error);
      return rejectWithValue(error?.message);
    }
  },
);
const merchant = createAsyncThunk(
  joinWithSlash(MERCHANT, 'merchant'),
  async (merchantId: string, {rejectWithValue}) => {
    try {
      const response = await getMerchant(merchantId);

      console.log('FETCHING Merchant', JSON.stringify(response));
      return response?.data;
    } catch (error) {
      console.log('Error fetching merchants', error);
      return rejectWithValue(error?.message);
    }
  },
);

const {actions, reducer} = createSlice({
  name: MERCHANT,
  initialState,
  reducers: {},
  extraReducers: {
    [merchants.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [merchants.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.docs = payload.docs;
    },
    [merchants.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload.error;
    },
    [merchant.pending.type]: (state, {payload}) => {
      state.loadingMerchant = true;
      state.error = '';
    },
    [merchant.fulfilled.type]: (state, {payload}) => {
      state.loadingMerchant = false;
      state.error = '';
      state.merchant = payload.user;
    },
    [merchant.rejected.type]: (state, {payload}) => {
      state.loadingMerchant = false;
      state.error = payload.error;
    },
  },
});

export const merchantActions = {
  ...actions,
  merchants,
  merchant,
};

export default reducer;
