import axios from '@whenly/utils/axios-local';
import {User} from 'redux';

export const getCurrentUser = () => axios.get('/v1/auth');
export const getRequestAccountDeletion = () =>
  axios.get('/v1/auth/request-account-deletion');

export const postLogin = (email: string, password: string) =>
  axios.post('/v1/auth/login', {email, password});

export const postRegister = (user: Partial<User>) =>
  axios.post('/v1/auth/register', {...user, providers: ['email']});

export const postLogout = () => axios.post('/v1/auth/logout');

export const postFacebookLogin = (access_token: string) =>
  axios.post('/v1/auth/facebook', {access_token});

export const postGoogleLogin = (access_token: string) =>
  axios.post('/v1/auth/google', {access_token});

export const postSendOTP = (phoneNumber: string) => {
  axios.post('/v1/auth/send-verification-sms', {phoneNumber});
};
export const postVerifyOTP = (code: string) =>
  axios.post(`/v1/auth/verify-otp?code=${code}`);

export const getActivityList = () => axios.get(`/v1/activity`);
