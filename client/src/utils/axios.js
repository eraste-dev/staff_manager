import axios from 'axios';

// ----------------------------------------------------------------------
const apiUrl = 'http://localhost:8000/api/v1';
const axiosInstance = axios.create({ baseURL: apiUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Une erreur s'est produite")
);

export default axiosInstance;
