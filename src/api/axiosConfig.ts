import axios from "axios";

const instance = axios.create({
  baseURL: "https://syndication.api.eb.com/production",
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY_1,
  },
});

export { instance };
