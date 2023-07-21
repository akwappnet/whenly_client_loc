import {ENVIRONMENT, DRAGON_PAY_TOKEN, XENDIT_SECRET_KEY} from '@env';
import Axios from 'axios';
import axios from '@whenly/utils/axios-local';
import {omit} from 'ramda';
import {normalizePhoneNumber} from '@whenly/utils/numbers';

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

export const requestPayment = ({txnId, ...rest}: RequestPaymentPayload) =>
  dragonPayInstance.post(
    `${txnId}/post`,
    {...rest, Param1: 'mobile', Param2: 'dragonpay'},
    {
      headers: {Authorization: `Bearer ${DRAGON_PAY_TOKEN}`},
    },
  );
