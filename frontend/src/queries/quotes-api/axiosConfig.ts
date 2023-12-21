import axios from "axios";

const instance = axios.create({
  baseURL: "https://quotes-api-408713.as.r.appspot.com",
});

export { instance };
