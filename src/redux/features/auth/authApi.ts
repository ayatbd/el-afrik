import { baseApi } from "@/redux/api/baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: { email: string; password: string }) => {
                console.log(credentials);
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: credentials,
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;