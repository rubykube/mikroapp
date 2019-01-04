import axiosInstance from './requestBuilder';


export const getAccount = () => {
  return axiosInstance.get('/api/v2/barong/resource/users/me')
    .then(response => response.data)
};
