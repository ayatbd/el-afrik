import axios from 'axios';
import { setCredentials, logout } from '../redux/features/auth/authSlice';
import { store } from '@/redux/store';

// Create base instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

// 1. Request Interceptor: Attach Access Token
api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.accessToken;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Response Interceptor: Handle 401 & Refresh Token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 Unauthorized and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get refresh token from LocalStorage (persisted)
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                // Call backend to get new tokens
                const { data } = await axios.post('http://localhost:5000/api/auth/refresh', {
                    refreshToken: refreshToken
                });

                // Assuming backend returns same structure: { data: { accessToken: "..." } }
                const newAccessToken = data.data.accessToken;

                // Save new Access Token to Redux
                store.dispatch(setCredentials({ accessToken: newAccessToken }));

                // Update the header of the failed request
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Retry the original request
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed (token expired or invalid) -> Logout user
                store.dispatch(logout());
                // Optional: Redirect to login page
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;