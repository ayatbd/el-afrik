import { apiSlice } from "./apiSlice";

export const termsConditionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTermsCondition: builder.query({
            query: () => ({
                url: "/terms/retrive",
                method: "GET",
            }),
            providesTags: ["TermsCondition"],
        }),
        updateTermsCondition: builder.mutation({
            query: (data) => ({
                url: "/terms/create-or-update",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TermsCondition"],
        }),
    }),
});

export const { useGetTermsConditionQuery, useUpdateTermsConditionMutation } = termsConditionApi;