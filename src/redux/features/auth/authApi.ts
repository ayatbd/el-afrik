import { apiSlice } from '../../api/apiSlice';
import { setCredentials, logout } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        // Endpoint to manually refresh token on page load
        refresh: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken },
            }),
            // THIS PART IS CRITICAL
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    // DEBUG: Uncomment this if still stuck
                    // console.log("Refresh Successful, New Token:", data.data.accessToken);

                    // Make sure the path to accessToken matches your actual API response!
                    // Your API example: { data: { accessToken: "..." } }
                    const newAccessToken = data.data.accessToken;

                    if (newAccessToken) {
                        dispatch(setCredentials({ accessToken: newAccessToken }));
                    }
                } catch (err) {
                    console.error("Refresh failed in onQueryStarted");
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRefreshMutation } = authApi;