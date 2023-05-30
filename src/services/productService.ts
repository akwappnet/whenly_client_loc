// products refers to CLASSES, APPOINTMENTS AND COMMUNITIES

import {ENVIRONMENT, DRAGON_PAY_TOKEN} from '@env';
import axios from '@whenly/utils/axios-local';
import Axios from 'axios';
import qs from 'querystring';

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

export const getPlans = (params: any) =>
  // axios.get(
  //   `/v1/plans?${qs.stringify({...params, visible: 'yes', status: 'active'})}`,
  // );
  axios.get(`/v1/plans`);

export const getPlan = (planId: string) => axios.get(`/v1/plans/${planId}`);

export const getClasses = (params: any) =>
  // axios.get(
  //   `/v1/classes?${qs.stringify({
  //     ...params,
  //     visible: 'yes',
  //     status: 'active',
  //   })}`,
  // );
  axios.get(`/v1/classes?page=3`);

export const getClass = (classId: string) =>
  axios.get(`/v1/classes/${classId}`);

export const requestPayment = ({txnId, ...rest}: RequestPaymentPayload) =>
  dragonPayInstance.post(
    `${txnId}/post`,
    {...rest, Param1: 'mobile'},
    {
      headers: {Authorization: `Bearer ${DRAGON_PAY_TOKEN}`},
    },
  );

export const subscribePlan = (payload: {
  planId: string;
  referenceNo: string;
  transactionId: string;
}) => axios.post('v1/clients/subscribe', {...payload});

//TODO:this parameter pass then not success payment
// export const subscribePlan = (payload: {
//   planId: string;
//   referenceNo: string;
//   transactionId: string;
//   status: string;
// }) => axios.post('v1/clients/subscribe', {...payload, via: 'mobile'});

export const cancelSubscription = (subscriptionId: string) =>
  axios.delete(`v1/clients/subscriptions/${subscriptionId}`);

export const bookClass = (payload: {
  classId: string;
  referenceNo: string;
  transactionId: string;
  // status: string;
  // subscription: string;
}) => axios.post('v1/clients/book', {...payload});

// export const bookClass = (payload: {
//   classId: string;
//   referenceNo: string;
//   transactionId: string;
//   status: string;
//   subscription: string;
// }) => axios.post('v1/clients/book', {...payload, via: 'mobile'});

export const cancelClass = (classId: string) =>
  axios.delete(`v1/booking/${classId}`);

export const getInvoices = () => axios.get('/v1/invoices');
export const getInvoice = (invoiceId: string) =>
  axios.get(`/v1/invoices/${invoiceId}`);
