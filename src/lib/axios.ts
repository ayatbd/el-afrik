import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. https://api.example.com
    withCredentials: true, // if you use cookies
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: request interceptor
api.interceptors.request.use((config) => {
    // example: attach token
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Optional: response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
