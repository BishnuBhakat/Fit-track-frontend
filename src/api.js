import axios from 'axios';

// const API_BASE ="https://fit-track-backend-production.up.railway.app/api";
const API_BASE="http://localhost:8185/api";
export const api = axios.create({
  baseURL: API_BASE,
});
export default api;