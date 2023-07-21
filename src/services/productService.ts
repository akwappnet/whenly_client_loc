// products refers to CLASSES, APPOINTMENTS AND COMMUNITIES
import axios from '@whenly/utils/axios-local';
import qs from 'querystring';

export const getPlans = (params: any) =>
  axios.get(
    `/v1/plans?${qs.stringify({...params, visible: 'yes', status: 'active'})}`,
  );

export const getPlan = (planId: string) => axios.get(`/v1/plans/${planId}`);

export const getClasses = (params: any) =>
  axios.get(
    `/v1/classes?${qs.stringify({
      ...params,
      visible: 'yes',
      status: 'active',
    })}`,
  );

export const getClass = (classId: string) =>
  axios.get(`/v1/classes/${classId}`);

//TODO:this parameter pass then not success payment
export const subscribePlan = (payload: {
  planId: string;
  referenceNo: string;
  transactionId: string;
  status: string;
}) => axios.post('/v1/clients/subscribe', {via: 'mobile', ...payload});

export const cancelSubscription = (subscriptionId: string) =>
  axios.delete(`/v1/clients/subscriptions/${subscriptionId}`);

export const bookClass = (payload: {
  classId: string;
  referenceNo: string;
  transactionId: string;
  status: string;
  subscription: string;
}) => axios.post('/v1/clients/book', {via: 'mobile', ...payload});

export const cancelClass = (classId: string) =>
  axios.delete(`/v1/booking/${classId}`);

export const getInvoices = () => axios.get('/v1/invoices');
export const getInvoice = (invoiceId: string) =>
  axios.get(`/v1/invoices/${invoiceId}`);
