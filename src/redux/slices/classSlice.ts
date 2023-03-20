import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CLASSES, PLAN, PRODUCT} from '@whenly/constants';
import {getPlans, getPlan, getClasses, bookClass} from '@whenly/services';
import {joinWithSlash} from '@whenly/utils/string';

export interface ClassData {
  _id: string;
  status: string;
  productId: string;
  instructor: string;
  startsAt: string;
  endsAt: string;
  pricingId: string;
  name: string;
  description: string;
  tags: string;
  slots: number;
  price: number;
}

interface ClassState {
  class: ClassData | null;
  docs: ClassData[];
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
  loadingClass: boolean;
  error: string | null;
}

const initialState: ClassState = {
  class: null,
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
  loadingClass: false,
  error: '',
};

const classes = createAsyncThunk(
  joinWithSlash(CLASSES, 'classes'),
  async (merchantId: string, {rejectWithValue}) => {
    try {
      const response = await getClasses({createdBy: merchantId});

      console.log('fetching classes', response);
      return response?.data;
    } catch (error) {
      console.log('Error fetching classes', error);
      return rejectWithValue(error?.message);
    }
  },
);

const classDetails = createAsyncThunk(
  joinWithSlash(CLASSES, 'classDetails'),
  async (planId: string, {rejectWithValue}) => {
    try {
      const response = await getPlan(planId);

      return response?.data;
    } catch (error) {
      console.log('Error fetching class details', error);
      return rejectWithValue(error?.message);
    }
  },
);

const book = createAsyncThunk(
  joinWithSlash(CLASSES, 'book'),
  async (referenceNo: string, {rejectWithValue, getState}) => {
    try {
      const {class: classState} = getState();

      console.log('book class details', classState);
      const response = await bookClass(classState.class._id, referenceNo);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.message || error);
    }
  },
);

const {actions, reducer} = createSlice({
  name: CLASSES,
  initialState,
  reducers: {
    setClass: (state, {payload}) => {
      state.class = payload;
    },
  },
  extraReducers: {
    [classes.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [classes.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.docs = payload.docs;
    },
    [classes.rejected.type]: (state) => {
      state = initialState;
    },
    [classDetails.pending.type]: (state) => {
      state.loadingClass = true;
      state.error = '';
    },
    [classDetails.fulfilled.type]: (state, {payload}) => {
      state.loadingClass = false;
      state.error = '';
      state.class = payload;
    },
    [classDetails.rejected.type]: (state, {payload}) => {
      state.loadingClass = false;
      state.error = payload.error;
    },
  },
});

export const classActions = {
  ...actions,
  classes,
  classDetails,
  book,
};

export default reducer;
