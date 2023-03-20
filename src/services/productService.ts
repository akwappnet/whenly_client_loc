// products refers to CLASSES, APPOINTMENTS AND COMMUNITIES

import {API_URL, DRAGON_PAY_TOKEN} from '@env';
import axios from '@whenly/utils/axios-local';
import Axios from 'axios';
import qs from 'querystring';

const dragonPayInstance = Axios.create({
  baseURL: 'https://test.dragonpay.ph/api/collect/v1',
});

const txnid = 'WHENLY20230102-CEADE26F794C';

export interface RequestPaymentPayload {
  Amount: string;
  Currency: 'string' | 'PHP';
  Description: string;
  Email: string;
}

export const getPlans = (params: any) =>
  axios.get(`/v1/plans?${qs.stringify({...params, visible: 'yes'})}`);

export const getPlan = (planId: string) => axios.get(`/v1/plans/${planId}`);

export const getClasses = (params: any) =>
  axios.get(`/v1/classes?${qs.stringify({...params, visible: 'yes'})}`);

export const getClass = (classId: string) =>
  axios.get(`/v1/classes/${classId}`);

export const requestPayment = (payload: RequestPaymentPayload) =>
  dragonPayInstance.post(`${txnid}/post`, payload, {
    headers: {Authorization: `Bearer ${DRAGON_PAY_TOKEN}`},
  });

export const subscribePlan = (planId: string, referenceNo: string) =>
  axios.post(`v1/clients/subscribe`, {
    planId,
    referenceNo,
    transactionId: txnid,
  });

export const bookClass = (classId: string, referenceNo: string) =>
  axios.post(`v1/clients/book`, {
    classId,
    referenceNo,
    transactionId: txnid,
  });

export const getInvoices = () => axios.get(`/v1/invoices`);
export const getInvoice = (invoiceId: string) =>
  axios.get(`/v1/invoices/${invoiceId}`);
