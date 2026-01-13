import { apiSlice } from '../../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        // Example: Get User Profile (Protected Route)
        getProfile: builder.query({
            query: () => '/auth/me',
        }),
    }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;