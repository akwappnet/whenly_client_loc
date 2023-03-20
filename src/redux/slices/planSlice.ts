import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PLAN, PRODUCT} from '@whenly/constants';
import {getPlans, getPlan, subscribePlan} from '@whenly/services';
import {joinWithSlash} from '@whenly/utils/string';

export interface Plan {
  _id: string;
  status: string;
  productId: string;
  duration: number;
  interval: string;
  pricingId: string;
  name: string;
  description: string;
  tags: string;
  slots: number;
  price: number;
}

interface PlanState {
  plan: Plan | null;
  docs: Plan[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  loading: boolean;
  loadingPlan: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plan: null,
  docs: [],
  totalDocs: 0,
  limit: 0,
  page: 0,
  totalPages: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
  loading: false,
  loadingPlan: false,
  error: '',
};

const plans = createAsyncThunk(
  joinWithSlash(PRODUCT, 'plans'),
  async (merchantId: string, {rejectWithValue}) => {
    try {
      const response = await getPlans({createdBy: merchantId});

      return response?.data;
    } catch (error) {
      console.log('Error fetching plans', error);
      return rejectWithValue(error?.message);
    }
  },
);

const planDetails = createAsyncThunk(
  joinWithSlash(PRODUCT, 'planDetails'),
  async (planId: string, {rejectWithValue}) => {
    try {
      const response = await getPlan(planId);

      return response?.data;
    } catch (error) {
      console.log('Error fetching plan details', error);
      return rejectWithValue(error?.message);
    }
  },
);

const subscribeToPlan = createAsyncThunk(
  joinWithSlash(PLAN, 'subscribeToPlan'),
  async (referenceNo: string, {rejectWithValue, getState}) => {
    try {
      const {plan} = getState();

      const response = await subscribePlan(plan.plan._id, referenceNo);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const {actions, reducer} = createSlice({
  name: PLAN,
  initialState,
  reducers: {
    setPlan: (state, {payload}) => {
      state.plan = payload;
    },
  },
  extraReducers: {
    [plans.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [plans.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.docs = payload.docs;
    },
    [plans.rejected.type]: (state) => {
      state = initialState;
    },
    [subscribeToPlan.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [subscribeToPlan.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
    },
    [subscribeToPlan.rejected.type]: (state) => {
      state.loading = false;
    },
    [planDetails.pending.type]: (state) => {
      state.loadingPlan = true;
      state.error = '';
    },
    [planDetails.fulfilled.type]: (state, {payload}) => {
      state.loadingPlan = false;
      state.error = '';
      state.plan = payload;
    },
    [planDetails.rejected.type]: (state, {payload}) => {
      state.loadingPlan = false;
      state.error = payload.error;
    },
  },
});

export const planActions = {
  ...actions,
  plans,
  planDetails,
  subscribeToPlan,
};

export default reducer;
