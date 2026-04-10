import axios from "axios";

const API = axios.create({
  baseURL: "https://student-backend-1899.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = token;
  }
  return req;
});

export default API;
