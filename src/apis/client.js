import axios from 'axios';

const axiosInstance =  axios.create({
  baseURL: 'http://192.168.0.166:3000/',
});


axiosInstance.interceptors.request.use( async (config) => {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosInstance;