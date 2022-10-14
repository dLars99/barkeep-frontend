import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_API_URL,
};

const api = axios.create(config);

export default api;
