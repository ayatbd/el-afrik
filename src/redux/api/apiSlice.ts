import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../features/auth/authSlice';
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie';

const mutex = new Mutex();

// Helper interface based on your JSON response
interface ApiResponse {
    success: boolean;
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface RootState {
    auth: {
        accessToken: string | null;
    };
}

// http://15.223.245.199/api/v1

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://10.10.20.34:5000/api/v1',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        let token = state.auth.accessToken;

        // Fallback: If Redux is empty, check LocalStorage directly
        if (!token && typeof window !== 'undefined') {
            token = localStorage.getItem('accessToken');
        }

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: Record<string, unknown>) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if (refreshToken) {
                    const refreshResult = await baseQuery(
                        {
                            url: '/auth/refresh',
                            method: 'POST',
                            body: { refreshToken },
                        },
                        api,
                        extraOptions
                    );

                    const responseData = refreshResult.data as ApiResponse;

                    // FIX: Access nested data properly based on your JSON
                    const newAccessToken = responseData?.data?.accessToken;
                    const newRefreshToken = responseData?.data?.refreshToken;

                    if (newAccessToken) {
                        // Store both tokens (Update refresh token if the API rotates it)
                        api.dispatch(setCredentials({
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken || refreshToken
                        }));

                        // Retry the original request
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(logout());
                        // Use window.location only if you are not using Next.js router, 
                        // otherwise use router.push('/login') if accessible or handle in UI
                        if (typeof window !== 'undefined') window.location.href = '/login';
                    }
                } else {
                    api.dispatch(logout());
                    if (typeof window !== 'undefined') window.location.href = '/login';
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product', 'Dashboard', "Category", "Faq", "User", "PrivacyPolicy", "TermsCondition", "AboutUs", "Profile", "Orders", "Stats", "Categories", "Caterings", "Notification", "Job", "Promo", "Qr", "CateringBooking", "Ads"],
    endpoints: () => ({}),
});