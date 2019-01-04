import axiosInstance from './requestBuilder';


export const logoutUser = () => {
  return axiosInstance.delete('/api/v2/barong/identity/sessions')
    .then(response => response.data)
};

export const loginUser = (email, password, otp_code='', recaptcha_response='') => {
  return axiosInstance.post(
      '/api/v2/barong/identity/sessions',
      { email, password, otp_code, recaptcha_response },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    .then(response => response.data)
};
