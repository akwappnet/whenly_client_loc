import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CLIENT, PRODUCT} from '@whenly/constants';
import {
  getBookings,
  getInvoice,
  getLatestBookingReview,
  getPlans,
  getReviewDataDetail,
  getReviewQuestion,
  getSubscriptions,
  requestPayment,
  RequestPaymentPayload,
  reviewSubmit,
} from '@whenly/services';
import {joinWithSlash} from '@whenly/utils/string';

export interface Product {
  id: string;
  name: string;
  address: string;
}

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
}

export interface Invoice {
  paymentDetails: {
    transactionId: string;
    referenceNo: string;
  };
  status: string;
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  createdBy: string;
  lineItems: [
    {
      productId: string;
      lineAmount: number;
      vatAmount: number;
      vatPercentage: number;
      unitPrice: number;
      quantity: number;
      _id: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Subscription {
  status: string;
  customerId: string;
  invoiceId: string;
  planId: string;
  startsAt: string;
  endsAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sessions: number;
  tags: string;
  id: string;
}

export type ProductState = {
  loading: boolean;
  loadingDetails: boolean;
  error: string;
  invoice: Invoice | null;
  invoices: Invoice[];
  subscriptions: Subscription[];
  bookings: Subscription[];
  question: Subscription[];
  latestBookingReview: Subscription[];
  submitReviewget: Subscription[];
};

const initialState: ProductState = {
  loading: false,
  loadingDetails: false,
  error: '',
  invoice: null,
  invoices: [],
  subscriptions: [],
  bookings: [],
  question: [],
  latestBookingReview: [],
  submitReviewget: [],
};

const getDragonPayToken = createAsyncThunk(
  joinWithSlash(PRODUCT, 'dragonpay-token'),
  async (payload: RequestPaymentPayload, {rejectWithValue}) => {
    try {
      const response = await requestPayment(payload);
      console.log('get dragonpay token', response);
      return response.data;
    } catch (error) {
      console.log('get dragonpay token error', error?.response);
      return rejectWithValue(error?.message || error);
    }
  },
);

const invoice = createAsyncThunk(
  joinWithSlash(PRODUCT, 'invoice'),
  async (invoiceId: string, {rejectWithValue}) => {
    try {
      const response = await getInvoice(invoiceId);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.message || error);
    }
  },
);

const subscriptions = createAsyncThunk(
  joinWithSlash(CLIENT, 'subscriptions'),
  async (_, {rejectWithValue}) => {
    try {
      const response = await getSubscriptions();

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);
const bookings = createAsyncThunk(
  joinWithSlash(CLIENT, 'bookings'),
  async (_, {rejectWithValue}) => {
    try {
      const response = await getBookings();

      console.log('BOOKINGS', response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

const reviewQuestions = createAsyncThunk(
  joinWithSlash(CLIENT, 'reviewQuestion'),
  async (_, {rejectWithValue}) => {
    try {
      const response = await getReviewQuestion();
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

const getReviewData = createAsyncThunk(
  joinWithSlash(CLIENT, 'getReviewData'),
  async (params) => {
    try {
      const response = await getReviewDataDetail(params);
      return response?.data;
    } catch (error) {
      console.log('Error', error);
    }
  },
);

const latestBookingReview = createAsyncThunk(
  joinWithSlash(CLIENT, 'latestBookingReview'),
  async (_, {rejectWithValue}) => {
    try {
      const response = await getLatestBookingReview();
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

const submitReviewQuestions = createAsyncThunk(
  joinWithSlash(CLIENT, 'submitReviewQuestion'),
  async (payload, {rejectWithValue}) => {
    try {
      const response = await reviewSubmit(payload);
    } catch (error: any) {
      console.log('Error', error);
      return rejectWithValue('Something went wrong. Please try again');
    }
  },
);

const {actions, reducer} = createSlice({
  name: PRODUCT,
  initialState,
  reducers: {},
  extraReducers: {
    [getDragonPayToken.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [getDragonPayToken.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [getDragonPayToken.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
    },
    [invoice.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [invoice.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.invoice = payload;
    },
    [subscriptions.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [subscriptions.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.subscriptions = payload.docs;
    },
    [bookings.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [bookings.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.bookings = payload.docs;
    },
    [reviewQuestions.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [reviewQuestions.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.question = payload.data.docs;
    },
    [submitReviewQuestions.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [submitReviewQuestions.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      // state.question = payload.data.docs;
    },
    [getReviewData.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [getReviewData.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
    },
    [latestBookingReview.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [latestBookingReview.fulfilled.type]: (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.latestBookingReview = payload;
    },
  },
});

export const productActions = {
  ...actions,
  getDragonPayToken,
  invoice,
  subscriptions,
  bookings,
  reviewQuestions,
  submitReviewQuestions,
  getReviewData,
  latestBookingReview,
};

export default reducer;
