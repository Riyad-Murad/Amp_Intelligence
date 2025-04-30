import axios from 'axios'

const token = localStorage.getItem("Token");

const axiosBaseUrl = axios.create({
  baseURL: "http://localhost:8000/api/v1",

  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosBaseUrl;