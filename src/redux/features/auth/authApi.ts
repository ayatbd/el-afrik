import { apiSlice } from '../../api/apiSlice';
import { setCredentials } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            // Automate token storage on successful login
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // data = { success: true, data: { accessToken: "...", refreshToken: "..." } }

                    // Dispatch the INNER data object
                    dispatch(setCredentials(data.data));
                } catch (err) {
                    console.error("Login failed", err);
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;