import axios from '@whenly/utils/axios-local';
import {User} from '@types/alltypes';

export const getSubscriptions = () => axios.get('v1/clients/subscriptions');
export const getBookings = () => axios.get('v1/clients/bookings');
export const postUpdateClient = (payload: Partial<User>) => {
  const userId = payload.id;
  delete payload.id;
  return axios.post(`/v1/clients/${userId}`, payload);
};
