import axios from '@whenly/utils/axios-local';
import {User} from '@types/alltypes';

export const getSubscriptions = () => axios.get('v1/clients/subscriptions');
export const getBookings = () => axios.get('v1/clients/bookings');
export const getReviewQuestion = () => axios.get('v1/reviewQuestions');
export const getLatestBookingReview = () => axios.get('v1/booking/review');
export const getReviewDataDetail = (params: any) =>
  axios.get(`/v1/review/merchant/${params}`);
export const postUpdateClient = (payload: Partial<User>) => {
  const userId = payload.id;
  delete payload.id;
  return axios.post(`/v1/clients/${userId}`, payload);
};

export const reviewSubmit = (payload: any) => {
  console.log('payLoadData', payload);
  return axios.post(`/v1/review/`, payload);
};
