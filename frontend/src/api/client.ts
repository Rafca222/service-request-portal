import axios from 'axios';

const api = axios.create({
  baseURL: 'https://d2cadt64p8fyxe.cloudfront.net',
});

export default api;