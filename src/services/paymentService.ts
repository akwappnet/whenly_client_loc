import {
  ENVIRONMENT,
  DRAGON_PAY_TOKEN,
  XENDIT_SECRET_KEY,
  SECRET_KEY,
} from '@env';
import Axios from 'axios';
import axios from '@whenly/utils/axios-local';
import {omit} from 'ramda';
import {normalizePhoneNumber} from '@whenly/utils/numbers';

const StripeInstance = Axios.create({
  baseURL: 'https://api.stripe.com/v1/',
});

const dragonPayInstance = Axios.create({
  baseURL:
    ENVIRONMENT === 'production'
      ? 'https://gw.dragonpay.ph/api/collect/v1'
      : 'https://test.dragonpay.ph/api/collect/v1',
});

export interface RequestPaymentPayload {
  txnId: string;
  Amount: string;
  Currency: 'string' | 'PHP';
  Description: string;
  Email: string;
}

export const createXenditInvoice = (payload: any) => {
  const {user} = payload;
  const baseURL =
    ENVIRONMENT === 'production'
      ? 'https://app.whenly.ph'
      : 'https://staging.app.whenly.ph';
  const updatedPayload = {
    ...omit(['user'], payload),
    currency: 'PHP',
    payer_email: user.email,
    payment_methods: ['CREDIT_CARD'],
    customer: {
      given_names: user.firstName,
      surname: user.lastName,
      email: user.email,
      mobile_number: normalizePhoneNumber(user.phoneNumber),
    },
    locale: 'en',
    success_redirect_url: `${baseURL}/payment`,
    failure_redirect_url: `${baseURL}/payment`,
  };

  return axios.post('/v1/payments/xendit/create-invoice', updatedPayload);
};

export const createStripeCustomer = (payload: any) => {
  return StripeInstance.post('customers', payload?.email, {
    headers: {Authorization: `Bearer ${payload.secreate_stripe_key}`},
  });
};

export const createEphemeralKeyCall = (payload: any) => {
  return StripeInstance.post('ephemeral_keys', payload, {
    headers: {
      'Stripe-Version': '2022-11-15',
      Authorization: `Bearer ${SECRET_KEY}`,
    },
  });
};

export const createPaymentIntentsCall = (payload: any) => {
  return StripeInstance.post('payment_intents', payload, {
    headers: {
      'Stripe-Version': '2022-11-15',
      Authorization: `Bearer ${SECRET_KEY}`,
    },
  });
};

export const createPaymentApiCall = (payload: any) => {
  return axios.post('/v1/payments/payment-intent', payload);
};

export const requestPayment = ({txnId, ...rest}: RequestPaymentPayload) =>
  dragonPayInstance.post(
    `${txnId}/post`,
    {...rest, Param1: 'mobile', Param2: 'dragonpay'},
    {
      headers: {Authorization: `Bearer ${DRAGON_PAY_TOKEN}`},
    },
  );
