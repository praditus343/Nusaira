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


const fetchData = async (endpoint) => {
  try {
    return await axiosInstance.get(endpoint);
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    throw error;
  }
};


const postData = async (endpoint, data) => {
  try {
    return await axiosInstance.post(endpoint, data);
  } catch (error) {
    console.error(`Post error for ${endpoint}:`, error);
    throw error;
  }
};


const putData = async (endpoint, data) => {
  try {
    return await axiosInstance.put(endpoint, data);
  } catch (error) {
    console.error(`Put error for ${endpoint}:`, error);
    throw error;
  }
};


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


const deleteData = async (endpoint) => {
  try {
    return await axiosInstance.delete(endpoint);
  } catch (error) {
    console.error(`Delete error for ${endpoint}:`, error);
    throw error;
  }
};

export const fetchCityPrediction = (city) => fetchData(`/predictions/city/${city}`);

export const fetchMultipleCitiesPredictions = async (cities) => {
  try {
    const predictions = await Promise.all(
      cities.map((city) => fetchCityPrediction(city))
    );
    return cities.reduce((acc, city, index) => {
      acc[city] = predictions[index];
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching multiple cities:', error);
    throw error;
  }
};


export const CITIES = {
  'JAWA BARAT': ['Bandung', 'Bekasi', 'Bogor', 'Cirebon', 'Subang'],
  'JAWA TIMUR': ['Tulungagung', 'Malang', 'Jember', 'Blitar', 'Kediri'],
  'JAWA TENGAH': ['Magelang', 'Pekalongan', 'Boyolali', 'Cilacap', 'Kebumen'],
};


export const fetchUnreadMessages = () => fetchData('/contact/unread');
export const markMessageAsRead = (id) => putData(`/contact/mark-read/${id}`);
export const deleteMessage = (id) => deleteData(`/contact/messages/${id}`);
export const fetchTambak = () => fetchData('/tambak');
export const fetchSiklus = () => fetchData('/siklus');
export const fetchKematian = () => fetchData('/data-kematian');
export const fetchPakan = () => fetchData('/data-pakan');
export const fetchPanen = () => fetchData('/data-panen');
export const fetchAnco = () => fetchData('/anco');
export const fetchAir = () => fetchData('/air');


export const debouncedFetchTambak = createDebouncedFetch('/tambak');


export default axiosInstance;
