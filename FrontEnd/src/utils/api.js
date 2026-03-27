// src/api/adminApi.js
import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://localhost:5000/api/auth/admin",
  withCredentials: true, // ✅ session
});

export default adminAPI;


