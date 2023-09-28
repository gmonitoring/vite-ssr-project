import axios from "axios";

const JSONServerClient = axios.create({
  baseURL: "http://localhost:5000/", // TODO add to env
  timeout: 5000,
  responseType: "json",
});

JSONServerClient.interceptors.response.use((response) => {
  return response.data;
});

export default JSONServerClient;
