import axiosInstance from './requestBuilder';


export const postNewWithdraws = data => {
  return axiosInstance.post('/api/v1/applogic/withdraws', data)
    .then(response => response.data);
};
