import axios from 'axios';
import { debounce } from 'lodash';

const BASE_URL = 'https://nusaira-be.vercel.app/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

const createDebouncedFetch = (endpoint) => {
  return debounce(async () => {
    try {
      return await axiosInstance.get(endpoint);
    } catch (error) {
      console.error(`Fetch error for ${endpoint}:`, error);
      throw error;
    }
  }, 300);
};

const fetchData = async (endpoint) => {
  try {
    return await axiosInstance.get(endpoint);
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    throw error;
  }
};


export const fetchTambak = () => fetchData('/tambak');
export const fetchSiklus = () => fetchData('/siklus');
export const fetchKematian = () => fetchData('/data-kematian');
export const fetchPakan = () => fetchData('/data-pakan');
export const fetchPanen = () => fetchData('/data-panen');
export const fetchAnco = () => fetchData('/anco');


export const debouncedFetchTambak = createDebouncedFetch('/tambak');

export default axiosInstance;