import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const signUp = (data) => api.post("/api/signUp", data);
export const signIn = (data) => api.post("/api/signIn", data);

export default api;
