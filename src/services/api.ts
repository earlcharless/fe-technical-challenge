import axios from "axios";

const BASE_URL = "https://api.chess.com/pub";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;