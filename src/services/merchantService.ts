// products refers to CLASSES, APPOINTMENTS AND COMMUNITIES

import axios from '@whenly/utils/axios-local';

export const getMerchants = () => axios.get(`/v1/merchants?visible=true`);

export const getMerchant = (merchantId: string) =>
  axios.get(`/v1/merchants/${merchantId}?visible=true`);
