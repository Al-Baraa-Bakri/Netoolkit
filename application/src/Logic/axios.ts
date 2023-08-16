import axios from "axios"; 

const api = import.meta.env.VITE_API

const axiosInstance = axios.create({
  baseURL : api,
  headers: {
    "Content-Type": "application/json",
    "timeout" : 1000,
  }, 
});

export default axiosInstance;