import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // backend URL
  timeout: 10000,
});

export default axiosInstance;
