import { apiSlice } from "./apiSlice";

export const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (id) => `/profile/${id}`,
        }),
    }),
});