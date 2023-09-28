import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://www.anapioficeandfire.com/api/", // TODO add to env
  timeout: 5000,
  responseType: "json",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Accept-Encoding": "application/json",
  },
});

httpClient.interceptors.response.use((response) => {
  return response.data;
});

httpClient.interceptors.request.use((config) => {
  if (config.headers) {
    if (typeof window === "undefined") {
      config.headers["Accept-Encoding"] = "application/json";
    } else {
      if (config.headers["Accept-Encoding"])
        delete config.headers["Accept-Encoding"];
    }
  }

  return config;
});

export default httpClient;
