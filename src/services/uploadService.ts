import axios from '@whenly/utils/axios-local';

export const postUploadAvatar = (payload: FormData) => {
  return axios.post('/v1/files/avatar', payload, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
