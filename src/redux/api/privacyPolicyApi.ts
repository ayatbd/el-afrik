import { apiSlice } from "./apiSlice";

export const privacyPolicyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: "/privacy/retrive",
                method: "GET",
            }),
            providesTags: ["PrivacyPolicy"],
        }),
        updatePrivacyPolicy: builder.mutation({
            query: (data) => ({
                url: "/privacy/create-or-update",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["PrivacyPolicy"],
        }),
        deletePrivacyPolicy: builder.mutation({
            query: () => ({
                url: "/privacy/create-or-update",
                method: "DELETE",
            }),
            invalidatesTags: ["PrivacyPolicy"],
        }),
        publishPrivacyPolicy: builder.mutation({
            query: () => ({
                url: "/privacy/create-or-update",
                method: "POST",
            }),
            invalidatesTags: ["PrivacyPolicy"],
        }),
    }),
});

export const {
    useGetPrivacyPolicyQuery,
    useUpdatePrivacyPolicyMutation,
    useDeletePrivacyPolicyMutation,
    usePublishPrivacyPolicyMutation,
} = privacyPolicyApi;