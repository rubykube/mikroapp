import axiosInstance from './requestBuilder';


export const getUser = () => {
  return axiosInstance.get('/api/v2/barong/resource/users/me')
    .then(response => response.data)
};
