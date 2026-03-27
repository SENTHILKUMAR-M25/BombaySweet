// src/api/userApi.js
import axios from "axios";

const userAPI = axios.create({
  baseURL: "http://localhost:5000/api/auth/user",
  withCredentials: true,
});

export default userAPI;