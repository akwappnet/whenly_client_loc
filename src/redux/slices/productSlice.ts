import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CLIENT, PRODUCT} from '@whenly/constants';
import {
  getBookings,
  getInvoice,
  getPlans,
  getSubscriptions,
  requestPayment,
  RequestPaymentPayload,
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
};

const initialState: ProductState = {
  loading: false,
  loadingDetails: false,
  error: '',
  invoice: null,
  invoices: [],
  subscriptions: [],
  bookings: [],
};

const getDragonpayToken = createAsyncThunk(
  joinWithSlash(PRODUCT, 'dragonpay-token'),
  async (payload: RequestPaymentPayload, {rejectWithValue}) => {
    try {
      const response = await requestPayment(payload);

      console.log('get dragonpay token', response);
      return response.data;
    } catch (error) {
      console.log('get dragonpay token error', error);

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

const {actions, reducer} = createSlice({
  name: PRODUCT,
  initialState,
  reducers: {},
  extraReducers: {
    [getDragonpayToken.pending.type]: (state, {payload}) => {
      state.loading = true;
      state.error = '';
    },
    [getDragonpayToken.rejected.type]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [getDragonpayToken.fulfilled.type]: (state, {payload}) => {
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
  },
});

export const productActions = {
  ...actions,
  getDragonpayToken,
  invoice,
  subscriptions,
  bookings,
};

export default reducer;
