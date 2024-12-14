import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888', // Gateway URL
});

export default api;
