import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

const instance = axios.create({
  baseURL: "https://syndication.api.eb.com/production",
  headers: {
    "x-api-key": process.env.API_KEY_1,
  },
});

export { instance };
