import { createApi, fetchBaseQuery, BaseQueryApi } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../features/auth/authSlice';
import { Mutex } from 'async-mutex';

// Create a mutex to prevent multiple refresh calls when multiple requests fail simultaneously
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
        // 1. Attach Access Token from Redux Store
        const token = (getState() as any).auth.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: BaseQueryApi, extraOptions: any) => {
    // 2. Wait until the mutex is available (if a refresh is already happening)
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    // 3. If 401 Unauthorized, try to refresh
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                // Get Refresh Token from LocalStorage
                const refreshToken = localStorage.getItem('refreshToken');

                if (refreshToken) {
                    // 4. Call Refresh Endpoint
                    // Note: We use baseQuery directly to avoid infinite loops
                    const refreshResult = await baseQuery(
                        {
                            url: '/auth/refresh',
                            method: 'POST',
                            body: { refreshToken },
                        },
                        api,
                        extraOptions
                    );

                    if (refreshResult.data) {
                        // 5. Success! Update Redux with new Access Token
                        // Assuming backend response: { data: { accessToken: "..." } }
                        const newAccessToken = refreshResult.data.data.accessToken;

                        api.dispatch(setCredentials({ accessToken: newAccessToken }));

                        // 6. Retry the initial request with the new token
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        // Refresh failed (token expired completely)
                        api.dispatch(logout());
                        window.location.href = '/login';
                    }
                } else {
                    // No refresh token available
                    api.dispatch(logout());
                    window.location.href = '/login';
                }
            } finally {
                release(); // Release the lock
            }
        } else {
            // If mutex was locked, wait for it to unlock and retry the request
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product', 'Dashboard', "Category", "Faq", "User", "PrivacyPolicy"],
    endpoints: () => ({}),
});