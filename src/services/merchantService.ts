// products refers to CLASSES, APPOINTMENTS AND COMMUNITIES

import axios from '@whenly/utils/axios-local';
import qs from 'querystring';

export const getMerchants = (payload: any) =>
  // axios.get(`/v1/merchants?limit=9999`);
  axios.get(
    `/v1/merchants?${qs.stringify({
      // ...payload,
      visible: false,
      limit: 9999,
    })}`,
    console.log('@@@@2payloadData', payload),
  );

export const getMerchant = (merchantId: string) =>
  axios.get(`/v1/merchants/${merchantId}?visible=true`);
