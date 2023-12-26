import axios from "axios";
import { auth } from "../../firebase";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken()
  config.headers.Authorization = token
  return config
})

export { axiosInstance };
