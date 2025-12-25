import axios from "axios";

const api = axios.create({
  baseURL: "https://vercel-backend-one-sepia.vercel.app",
  withCredentials: true, // 🔥 ALWAYS SEND COOKIES
});

export default api;
