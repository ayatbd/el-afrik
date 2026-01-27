import { apiSlice } from '../../api/apiSlice';
import { setCredentials } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/admin/login',
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
        // 1. Send OTP to Email
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgotPass',
                method: 'POST',
                body: data, // { email: "admin@example.com" }
            }),
        }),
        // 2. Verify OTP
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verifyOtp',
                method: 'POST',
                body: data, // { email: "...", otp: "123456" }
            }),
        }),
        // 3. Reset Password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/changePassword',
                method: 'POST',
                body: data, // { email: "...", otp: "...", newPassword: "..." }
            }),
        }),
    }),
});

export const { useLoginMutation, useForgotPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation } = authApi;